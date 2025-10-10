import {balancesStore} from '$lib/stores/balances.store';
import {token} from '$lib/stores/token.store';
import type {OptionBalance} from '$lib/types/balance';
import {nonNullish} from '@dfinity/utils';
import {derived, type Readable} from 'svelte/store';

// TODO: Create tests for this store
export const balance: Readable<OptionBalance> = derived(
    [balancesStore, token],
    ([$balanceStore, $token]) => (nonNullish($token) ? $balanceStore?.[$token.id]?.data : undefined)
);
