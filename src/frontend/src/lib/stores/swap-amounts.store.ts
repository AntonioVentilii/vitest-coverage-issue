import type { OptionAmount } from '$lib/types/send';
import type { SwapMappedResult } from '$lib/types/swap';

export interface SwapAmountsStoreData {
	swaps: SwapMappedResult[];
	amountForSwap: OptionAmount;
	selectedProvider?: SwapMappedResult;
}


