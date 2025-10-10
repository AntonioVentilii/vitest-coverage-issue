import {browser} from '$app/environment';
import {ETHEREUM_NETWORK_SYMBOL} from '$env/networks/networks.eth.env';
import {SOLANA_MAINNET_NETWORK_SYMBOL} from '$env/networks/networks.sol.env';
import {BTC_MAINNET_SYMBOL} from '$env/tokens/tokens.btc.env';
import type {Principal} from '@dfinity/principal';
import {clear, createStore, del, type UseStore} from 'idb-keyval';

// There is no IndexedDB in SSG. Since this initialization occurs at the module's root, SvelteKit would encounter an error during the dapp bundling process, specifically a "ReferenceError [Error]: indexedDB is not defined". Therefore, the object for bundling on NodeJS side.
const idbAddressesStore = (key: string): UseStore =>
    browser ? createStore(`oisy-${key}-addresses`, `${key}-addresses`) : ({} as unknown as UseStore);

const idbBtcAddressesStoreMainnet = idbAddressesStore(BTC_MAINNET_SYMBOL.toLowerCase());


const idbEthAddressesStore = idbAddressesStore(ETHEREUM_NETWORK_SYMBOL.toLowerCase());

const idbSolAddressesStoreMainnet = idbAddressesStore(SOLANA_MAINNET_NETWORK_SYMBOL.toLowerCase());


export const deleteIdbBtcAddressMainnet = (principal: Principal): Promise<void> =>
    del(principal.toText(), idbBtcAddressesStoreMainnet);

export const deleteIdbEthAddress = (principal: Principal): Promise<void> =>
    del(principal.toText(), idbEthAddressesStore);

export const deleteIdbSolAddressMainnet = (principal: Principal): Promise<void> =>
    del(principal.toText(), idbSolAddressesStoreMainnet);

export const clearIdbBtcAddressMainnet = (): Promise<void> => clear(idbBtcAddressesStoreMainnet);

export const clearIdbEthAddress = (): Promise<void> => clear(idbEthAddressesStore);

export const clearIdbSolAddressMainnet = (): Promise<void> => clear(idbSolAddressesStoreMainnet);
