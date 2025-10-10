import {browser} from '$app/environment';
import type {Balance} from '$lib/types/balance';
import type {GetIdbBalancesParams} from '$lib/types/idb-balances';
import {delMultiKeysByPrincipal} from '$lib/utils/idb.utils';
import type {Principal} from '@dfinity/principal';
import {clear, createStore, get, type UseStore} from 'idb-keyval';

// There is no IndexedDB in SSG. Since this initialization occurs at the module's root, SvelteKit would encounter an error during the dapp bundling process, specifically a "ReferenceError [Error]: indexedDB is not defined". Therefore, the object for bundling on NodeJS side.
const createIdbBalancesStore = (): UseStore =>
    browser ? createStore(`oisy-balances`, `balances`) : ({} as unknown as UseStore);

const idbBalancesStore = createIdbBalancesStore();

const toKey = ({principal, tokenId, networkId}: GetIdbBalancesParams): IDBValidKey[] => [
    principal.toText(),
    `${tokenId.description}`,
    `${networkId.description}`
];


export const getIdbBalances = (params: GetIdbBalancesParams): Promise<Balance | undefined> =>
    get(toKey(params), idbBalancesStore);

export const deleteIdbBalances = (principal: Principal): Promise<void> =>
    delMultiKeysByPrincipal({principal, store: idbBalancesStore});

export const clearIdbBalances = (): Promise<void> => clear(idbBalancesStore);
