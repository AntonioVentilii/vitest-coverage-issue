import { getAgent } from '$lib/actors/agents.ic';
import type { CanisterIdText } from '$lib/types/canister';
import type { OptionIdentity } from '$lib/types/identity';
import type { Identity } from '@dfinity/agent';
import { BitcoinCanister, type BitcoinNetwork } from '@dfinity/ckbtc';
import { Principal } from '@dfinity/principal';
import { assertNonNullish } from '@dfinity/utils';

interface BitcoinCanisterParams {
	identity: OptionIdentity;
	bitcoinCanisterId: CanisterIdText;
	network: BitcoinNetwork;
	address: string;
	minConfirmations?: number;
}



export const getBalanceQuery = async ({
	identity,
	address,
	network,
	bitcoinCanisterId,
	minConfirmations
}: BitcoinCanisterParams & {
	minConfirmations?: number;
}): Promise<bigint> => {
	assertNonNullish(identity);

	const { getBalanceQuery } = await bitcoinCanister({ identity, bitcoinCanisterId });

	return getBalanceQuery({
		address,
		network,
		minConfirmations
	});
};

const bitcoinCanister = async ({
	identity,
	bitcoinCanisterId
}: {
	identity: Identity;
	bitcoinCanisterId: CanisterIdText;
}): Promise<BitcoinCanister> => {
	const agent = await getAgent({ identity });

	return BitcoinCanister.create({
		agent,
		canisterId: Principal.fromText(bitcoinCanisterId)
	});
};
