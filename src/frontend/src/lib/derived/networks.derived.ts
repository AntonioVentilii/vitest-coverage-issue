import {enabledBitcoinNetworks} from '$btc/derived/networks.derived';
import {ICP_NETWORK, ICP_PSEUDO_TESTNET_NETWORK} from '$env/networks/networks.icp.env';
import {enabledEthereumNetworks} from '$eth/derived/networks.derived';
import {enabledEvmNetworks} from '$evm/derived/networks.derived';
import type {Network} from '$lib/types/network';
import {enabledSolanaNetworks} from '$sol/derived/networks.derived';
import {derived, type Readable} from 'svelte/store';

export const networks: Readable<Network[]> = derived(
    [enabledBitcoinNetworks, enabledEthereumNetworks, enabledSolanaNetworks, enabledEvmNetworks],
    ([
         $enabledBitcoinNetworks,
         $enabledEthereumNetworks,
         $enabledSolanaNetworks,
         $enabledEvmNetworks
     ]) => [
        ...$enabledBitcoinNetworks,
        ...$enabledEthereumNetworks,
        ICP_NETWORK,
        ICP_PSEUDO_TESTNET_NETWORK,
        ...$enabledSolanaNetworks,
        ...$enabledEvmNetworks
    ]
);
