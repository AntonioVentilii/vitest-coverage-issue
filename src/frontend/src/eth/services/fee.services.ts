import type { EthAddress } from '$lib/types/address';

export interface GetFeeData {
	from: EthAddress;
	to: EthAddress;
	value?: bigint;
	data?: string;
}
