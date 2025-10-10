import type { Option } from '$lib/types/utils';

export type EthereumFeeStoreData = Option<{
	maxTransactionFee?: bigint;
}>;

