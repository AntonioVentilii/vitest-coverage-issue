import {browser} from '$app/environment';
import {BTC_MAINNET_NETWORK_SYMBOL} from '$env/networks/networks.btc.env';
import {ETHEREUM_NETWORK_SYMBOL} from '$env/networks/networks.eth.env';
import {ICP_NETWORK_SYMBOL} from '$env/networks/networks.icp.env';
import {SOLANA_MAINNET_NETWORK_SYMBOL} from '$env/networks/networks.sol.env';
import type {GetIdbTransactionsParams} from '$lib/types/idb-transactions';
import {delMultiKeysByPrincipal} from '$lib/utils/idb.utils';
import type {Principal} from '@dfinity/principal';
import {clear, createStore, type UseStore} from 'idb-keyval';

// There is no IndexedDB in SSG. Since this initialization occurs at the module's root, SvelteKit would encounter an error during the dapp bundling process, specifically a "ReferenceError [Error]: indexedDB is not defined". Therefore, the object for bundling on NodeJS side.
const idbTransactionsStore = (key: string): UseStore =>
    browser
        ? createStore(`oisy-${key}-transactions`, `${key}-transactions`)
        : ({} as unknown as UseStore);

const idbBtcTransactionsStore = idbTransactionsStore(BTC_MAINNET_NETWORK_SYMBOL.toLowerCase());
const idbEthTransactionsStore = idbTransactionsStore(ETHEREUM_NETWORK_SYMBOL.toLowerCase());
const idbIcTransactionsStore = idbTransactionsStore(ICP_NETWORK_SYMBOL.toLowerCase());
const idbSolTransactionsStore = idbTransactionsStore(SOLANA_MAINNET_NETWORK_SYMBOL.toLowerCase());

const toKey = ({principal, tokenId, networkId}: GetIdbTransactionsParams): IDBValidKey[] => [
    principal.toText(),
    `${tokenId.description}`,
    `${networkId.description}`
];


export const deleteIdbBtcTransactions = (principal: Principal): Promise<void> =>
    delMultiKeysByPrincipal({principal, store: idbBtcTransactionsStore});

export const deleteIdbEthTransactions = (principal: Principal): Promise<void> =>
    delMultiKeysByPrincipal({principal, store: idbEthTransactionsStore});

export const deleteIdbIcTransactions = (principal: Principal): Promise<void> =>
    delMultiKeysByPrincipal({principal, store: idbIcTransactionsStore});

export const deleteIdbSolTransactions = (principal: Principal): Promise<void> =>
    delMultiKeysByPrincipal({principal, store: idbSolTransactionsStore});

export const clearIdbBtcTransactions = (): Promise<void> => clear(idbBtcTransactionsStore);

export const clearIdbEthTransactions = (): Promise<void> => clear(idbEthTransactionsStore);

export const clearIdbIcTransactions = (): Promise<void> => clear(idbIcTransactionsStore);

export const clearIdbSolTransactions = (): Promise<void> => clear(idbSolTransactionsStore);
