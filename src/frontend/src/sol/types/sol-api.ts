import type { SolAddress } from '$lib/types/address';
import type { OptionIdentity } from '$lib/types/identity';
import type { SolanaNetworkType } from '$sol/types/network';
import type { SplTokenAddress } from '$sol/types/spl';

export interface GetSolTransactionsParams {
	identity: OptionIdentity;
	address: SolAddress;
	network: SolanaNetworkType;
	tokenAddress?: SplTokenAddress;
	tokenOwnerAddress?: SolAddress;
	before?: string;
	limit?: number;
}


