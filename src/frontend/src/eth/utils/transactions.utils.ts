import type { EthTransactionUi } from '$eth/types/eth-transaction';
import type { EthAddress, OptionEthAddress } from '$lib/types/address';
import type { Transaction } from '$lib/types/transaction';
import { nonNullish } from '@dfinity/utils';
import { AbiCoder } from 'ethers/abi';
import { dataSlice } from 'ethers/utils';


export const decodeErc20AbiDataValue = ({
	data,
	bytesParam = false
}: {
	data: string;
	bytesParam?: boolean;
}): bigint => {
	const [_to, value] = AbiCoder.defaultAbiCoder().decode(
		['address', 'uint256', ...(bytesParam ? ['bytes32'] : [])],
		dataSlice(data, 4)
	);

	return value;
};



/**
 * It maps a transaction to an Ethereum transaction UI object
 */
export const mapEthTransactionUi = ({
	transaction,
	ckMinterInfoAddresses,
	ethAddress
}: {
	transaction: Transaction;
	ckMinterInfoAddresses: EthAddress[];
	ethAddress: OptionEthAddress;
}): EthTransactionUi => {
	const { from, to } = transaction;

	return {
		...transaction,
		id: transaction.hash ?? '',
		type: ckMinterInfoAddresses.includes(from.toLowerCase())
			? 'withdraw'
			: nonNullish(to) && ckMinterInfoAddresses.includes(to.toLowerCase())
				? 'deposit'
				: from?.toLowerCase() === ethAddress?.toLowerCase()
					? 'send'
					: 'receive'
	};
};
