import { ZERO } from '$lib/constants/app.constants';
import type { SolAddress } from '$lib/types/address';
import type { OptionIdentity } from '$lib/types/identity';
import { getAccountInfo } from '$sol/api/solana.api';
import {
	ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ADDRESS,
	SYSTEM_PROGRAM_ADDRESS,
	TOKEN_2022_PROGRAM_ADDRESS,
	TOKEN_PROGRAM_ADDRESS
} from '$sol/constants/sol.constants';
import type { SolanaNetworkType } from '$sol/types/network';
import type { SolRpcInstruction } from '$sol/types/sol-instructions';
import type { SolMappedTransaction } from '$sol/types/sol-transaction';
import type { SplTokenAddress } from '$sol/types/spl';
import { isNullish, nonNullish } from '@dfinity/utils';

const mapSystemParsedInstruction = ({
	type,
	info
}: {
	type: string;
	info: object;
}): SolMappedTransaction | undefined => {
	if (type === 'createAccount') {
		// We need to cast the type since it is not implied
		const {
			source: from,
			newAccount: to,
			lamports: value
		} = info as {
			source: SolAddress;
			newAccount: SolAddress;
			lamports: bigint;
		};

		return { value, from, to };
	}

	if (type === 'transfer') {
		// We need to cast the type since it is not implied
		const {
			destination: to,
			lamports: value,
			source: from
		} = info as {
			destination: SolAddress;
			lamports: bigint;
			source: SolAddress;
		};

		return { value, from, to };
	}
};

const mapTokenParsedInstruction = async ({
	type,
	info,
	network,
	cumulativeBalances,
	addressToToken
}: {
	identity: OptionIdentity;
	type: string;
	info: object;
	network: SolanaNetworkType;
	cumulativeBalances?: Record<SolAddress, SolMappedTransaction['value']>;
	addressToToken?: Record<SolAddress, SplTokenAddress>;
}): Promise<SolMappedTransaction | undefined> => {
	if (type === 'transfer') {
		// We need to cast the type since it is not implied
		const {
			destination: to,
			amount: value,
			source: from
		} = info as {
			destination: SolAddress;
			amount: string;
			source: SolAddress;
		};

		const tokenAddress = addressToToken?.[from] ?? addressToToken?.[to];

		if (nonNullish(tokenAddress)) {
			return { value: BigInt(value), from, to, tokenAddress };
		}

		const { value: sourceResult } = await getAccountInfo({ address: from, network });

		if (nonNullish(sourceResult) && 'parsed' in sourceResult.data) {
			const {
				data: {
					parsed: { info: sourceInfo }
				}
			} = sourceResult;

			const { mint: tokenAddress } = sourceInfo as { mint: SplTokenAddress };

			return { value: BigInt(value), from, to, tokenAddress };
		}

		const { value: destinationResult } = await getAccountInfo({ address: to, network });

		if (nonNullish(destinationResult) && 'parsed' in destinationResult.data) {
			const {
				data: {
					parsed: { info: destinationInfo }
				}
			} = destinationResult;

			const { mint: tokenAddress } = destinationInfo as { mint: SplTokenAddress };

			return { value: BigInt(value), from, to, tokenAddress };
		}
	}

	if (type === 'transferChecked') {
		// We need to cast the type since it is not implied
		const {
			destination: to,
			tokenAmount: { amount: value },
			source: from,
			mint: tokenAddress
		} = info as {
			destination: SolAddress;
			tokenAmount: { amount: string };
			source: SolAddress;
			mint: SplTokenAddress;
		};

		return { value: BigInt(value), from, to, tokenAddress };
	}

	if (type === 'closeAccount') {
		// We need to cast the type since it is not implied
		const { destination: to, account: from } = info as {
			destination: SolAddress;
			account: SolAddress;
		};

		// In case of `closeAccount` transaction, we take the accumulated balance of SOL (or WSOL) of the Associated Token Account (this is the `from` address).
		// If we don't find the balance, we take the negative of the accumulated balance of the owner of the ATA (this is the `to` address).
		// We do this because the owner of the ATA redeems the entire amount of SOL (or WSOL).
		const value = cumulativeBalances?.[from] ?? -(cumulativeBalances?.[to] ?? ZERO);

		return { value, from, to };
	}

	if (type === 'mintTo') {
		// We need to cast the type since it is not implied
		const {
			account: to,
			mint: tokenAddress,
			amount: value
		} = info as {
			account: SolAddress;
			mint: SplTokenAddress;
			amount: string;
		};

		// For a mint transaction, we consider the token as the source of the transaction
		return { value: BigInt(value), from: tokenAddress, to, tokenAddress };
	}

	if (type === 'burn') {
		// We need to cast the type since it is not implied
		const {
			account: from,
			mint: tokenAddress,
			amount: value
		} = info as {
			account: SolAddress;
			mint: SplTokenAddress;
			amount: string;
		};

		// For a burn transaction, we consider the token as the destination of the transaction
		return { value: BigInt(value), from, to: tokenAddress, tokenAddress };
	}

	if (type === 'mintToChecked') {
		// We need to cast the type since it is not implied
		const {
			account: to,
			mint: tokenAddress,
			tokenAmount: { amount: value }
		} = info as {
			account: SolAddress;
			mint: SplTokenAddress;
			tokenAmount: { amount: string };
		};

		// For a mint transaction, we consider the token as the source of the transaction
		return { value: BigInt(value), from: tokenAddress, to, tokenAddress };
	}

	if (type === 'burnChecked') {
		// We need to cast the type since it is not implied
		const {
			account: from,
			mint: tokenAddress,
			tokenAmount: { amount: value }
		} = info as {
			account: SolAddress;
			mint: SplTokenAddress;
			tokenAmount: { amount: string };
		};

		// For a burn transaction, we consider the token as the destination of the transaction
		return { value: BigInt(value), from, to: tokenAddress, tokenAddress };
	}
};

// Solana program Token2022 provides exactly the same instructions as the legacy Token program plus a few more.
// So the implementation of the mapping of the instructions is the same as the legacy Token program for the instructions that are common.
const mapToken2022ParsedInstruction = async ({
	identity,
	type,
	info,
	network,
	cumulativeBalances,
	addressToToken
}: {
	identity: OptionIdentity;
	type: string;
	info: object;
	network: SolanaNetworkType;
	cumulativeBalances?: Record<SolAddress, SolMappedTransaction['value']>;
	addressToToken?: Record<SolAddress, SplTokenAddress>;
}): Promise<SolMappedTransaction | undefined> => {
	if (
		[
			'transfer',
			'transferChecked',
			'closeAccount',
			'mintTo',
			'burn',
			'mintToChecked',
			'burnChecked'
		].includes(type)
	) {
		return await mapTokenParsedInstruction({
			identity,
			type,
			info,
			network,
			cumulativeBalances,
			addressToToken
		});
	}
};

const mapAssociatedTokenAccountInstruction = ({
	type
}: {
	type: string;
}): SolMappedTransaction | undefined => {
	if (type === 'create' || type === 'createIdempotent') {
		// We don't need to map the instruction since it is not relevant for the user
		return;
	}
};

export const mapSolParsedInstruction = async ({
	identity,
	instruction,
	network,
	cumulativeBalances,
	addressToToken
}: {
	identity: OptionIdentity;
	instruction: SolRpcInstruction;
	network: SolanaNetworkType;
	cumulativeBalances?: Record<SolAddress, SolMappedTransaction['value']>;
	addressToToken?: Record<SolAddress, SplTokenAddress>;
}): Promise<SolMappedTransaction | undefined> => {
	if (!('parsed' in instruction)) {
		return;
	}

	const {
		parsed: { type, info },
		programAddress
	} = instruction;

	if (isNullish(info)) {
		return;
	}

	if (programAddress === SYSTEM_PROGRAM_ADDRESS) {
		return mapSystemParsedInstruction({ type, info });
	}

	if (programAddress === TOKEN_PROGRAM_ADDRESS) {
		return await mapTokenParsedInstruction({
			identity,
			type,
			info,
			network,
			cumulativeBalances,
			addressToToken
		});
	}

	if (programAddress === TOKEN_2022_PROGRAM_ADDRESS) {
		return mapToken2022ParsedInstruction({
			identity,
			type,
			info,
			network,
			cumulativeBalances,
			addressToToken
		});
	}

	if (programAddress === ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ADDRESS) {
		return mapAssociatedTokenAccountInstruction({ type });
	}

	// It is useful to receive feedback when we are not able to map an instruction
	console.warn(
		`Could not map Solana instruction of type ${type} for program ${programAddress}`,
		instruction
	);

	return;
};

