import type {Address} from '$lib/types/address';
import {isNullish} from '@dfinity/utils';
import {assertIsAddress} from '@solana/kit';

export const isSolAddress = (address: Address | undefined): boolean => {
    if (isNullish(address)) {
        return false;
    }

    try {
        assertIsAddress(address);
        return true;
    } catch (_: unknown) {
        return false;
    }
};
