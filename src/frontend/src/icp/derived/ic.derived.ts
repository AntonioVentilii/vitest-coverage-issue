import {getIcrcAccount} from '$icp/utils/icrc-account.utils';
import {authStore} from '$lib/stores/auth.store';
import {encodeIcrcAccount, type IcrcAccount} from '@dfinity/ledger-icrc';
import {nonNullish} from '@dfinity/utils';
import {derived, type Readable} from 'svelte/store';


export const icrcAccount: Readable<IcrcAccount | undefined> = derived(authStore, ({identity}) =>
    nonNullish(identity) ? getIcrcAccount(identity.getPrincipal()) : undefined
);

export const icrcAccountIdentifierText: Readable<string | undefined> = derived(
    icrcAccount,
    ($icrcAccountStore) =>
        nonNullish($icrcAccountStore) ? encodeIcrcAccount($icrcAccountStore) : undefined
);
