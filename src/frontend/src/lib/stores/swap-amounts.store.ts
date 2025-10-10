import type { OptionAmount } from '$lib/types/send';
import type { SwapMappedResult } from '$lib/types/swap';
import type { Option } from '$lib/types/utils';
import { type Readable } from 'svelte/store';

export interface SwapAmountsStoreData {
	swaps: SwapMappedResult[];
	amountForSwap: OptionAmount;
	selectedProvider?: SwapMappedResult;
}

export interface SwapAmountsStore extends Readable<Option<SwapAmountsStoreData>> {
	setSwaps: (params: {
		swaps: SwapMappedResult[];
		amountForSwap: OptionAmount;
		selectedProvider?: SwapMappedResult;
	}) => void;
	reset: () => void;
	setSelectedProvider: (provider: SwapMappedResult | undefined) => void;
}
