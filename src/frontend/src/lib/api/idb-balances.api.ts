import {browser} from '$app/environment';
import {delMultiKeysByPrincipal} from '$lib/utils/idb.utils';
import type {Principal} from '@dfinity/principal';
import {clear, createStore, type UseStore} from 'idb-keyval';

// There is no IndexedDB in SSG. Since this initialization occurs at the module's root, SvelteKit would encounter an error during the dapp bundling process, specifically a "ReferenceError [Error]: indexedDB is not defined". Therefore, the object for bundling on NodeJS side.
const createIdbBalancesStore = (): UseStore =>
    browser ? createStore(`oisy-balances`, `balances`) : ({} as unknown as UseStore);

const idbBalancesStore = createIdbBalancesStore();


export const deleteIdbBalances = (principal: Principal): Promise<void> =>
    delMultiKeysByPrincipal({principal, store: idbBalancesStore});

export const clearIdbBalances = (): Promise<void> => clear(idbBalancesStore);
