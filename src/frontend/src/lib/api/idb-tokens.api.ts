import {browser} from '$app/environment';
import type {CustomToken, UserToken} from '$declarations/backend/backend.did';
import {ETHEREUM_NETWORK_SYMBOL} from '$env/networks/networks.eth.env';
import {nullishSignOut} from '$lib/services/auth.services';
import type {SetIdbTokensParams} from '$lib/types/idb-tokens';
import {Principal} from '@dfinity/principal';
import {isNullish} from '@dfinity/utils';
import {clear, createStore, del, get, set as idbSet, type UseStore} from 'idb-keyval';

// There is no IndexedDB in SSG. Since this initialization occurs at the module's root, SvelteKit would encounter an error during the dapp bundling process, specifically a "ReferenceError [Error]: indexedDB is not defined". Therefore, the object for bundling on NodeJS side.
const idbTokensStore = (key: string): UseStore =>
    browser
        ? createStore(`oisy-${key}-custom-tokens`, `${key}-custom-tokens`)
        : ({} as unknown as UseStore);

// TODO: UserToken is deprecated - remove this when the migration to CustomToken is complete
const idbEthTokensStoreDeprecated = idbTokensStore(
    `${ETHEREUM_NETWORK_SYMBOL.toLowerCase()}-deprecated`
);
const idbAllCustomTokensStore = idbTokensStore('all');

export const setIdbTokensStore = async <T extends CustomToken | UserToken>({
                                                                               identity,
                                                                               tokens,
                                                                               idbTokensStore
                                                                           }: SetIdbTokensParams<T> & {
    idbTokensStore: UseStore;
}) => {
    if (isNullish(identity)) {
        await nullishSignOut();
        return;
    }

    await idbSet(identity.getPrincipal().toText(), tokens, idbTokensStore);
};

// TODO: UserToken is deprecated - remove this when the migration to CustomToken is complete
export const setIdbEthTokensDeprecated = (params: SetIdbTokensParams<UserToken>): Promise<void> =>
    setIdbTokensStore({...params, idbTokensStore: idbEthTokensStoreDeprecated});

export const setIdbAllCustomTokens = (params: SetIdbTokensParams<CustomToken>): Promise<void> =>
    setIdbTokensStore({...params, idbTokensStore: idbAllCustomTokensStore});

// TODO: UserToken is deprecated - remove this when the migration to CustomToken is complete
export const getIdbEthTokensDeprecated = (
    principal: Principal
): Promise<SetIdbTokensParams<UserToken>['tokens'] | undefined> =>
    get(principal.toText(), idbEthTokensStoreDeprecated);

export const getIdbAllCustomTokens = (
    principal: Principal
): Promise<SetIdbTokensParams<CustomToken>['tokens'] | undefined> =>
    get(principal.toText(), idbAllCustomTokensStore);

// TODO: UserToken is deprecated - remove this when the migration to CustomToken is complete
export const deleteIdbEthTokensDeprecated = (principal: Principal): Promise<void> =>
    del(principal.toText(), idbEthTokensStoreDeprecated);

export const deleteIdbAllCustomTokens = (principal: Principal): Promise<void> =>
    del(principal.toText(), idbAllCustomTokensStore);


// TODO: UserToken is deprecated - remove this when the migration to CustomToken is complete
export const clearIdbEthTokensDeprecated = (): Promise<void> => clear(idbEthTokensStoreDeprecated);

export const clearIdbAllCustomTokens = (): Promise<void> => clear(idbAllCustomTokensStore);
