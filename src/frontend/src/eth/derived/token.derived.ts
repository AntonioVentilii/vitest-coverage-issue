import {selectedEthereumNetwork} from '$eth/derived/network.derived';
import {enabledEthereumTokens} from '$eth/derived/tokens.derived';
import {evmNativeToken} from '$evm/derived/token.derived';
import {defaultFallbackToken} from '$lib/derived/token.derived';
import type {RequiredToken} from '$lib/types/token';
import {derived, type Readable} from 'svelte/store';

/**
 * Native token - i.e. not ERC20 - for the selected Ethereum/EVM network.
 */
export const nativeEthereumToken: Readable<RequiredToken | undefined> = derived(
    [enabledEthereumTokens, selectedEthereumNetwork, evmNativeToken],
    ([$enabledEthereumTokens, $selectedEthereumNetwork, $evmNativeToken]) =>
        $enabledEthereumTokens.find(
            ({network: {id: networkId}}) => $selectedEthereumNetwork?.id === networkId
        ) ?? $evmNativeToken
);

export const nativeEthereumTokenWithFallback: Readable<RequiredToken> = derived(
    [nativeEthereumToken, defaultFallbackToken],
    ([$nativeEthereumToken, $defaultFallbackToken]) => $nativeEthereumToken ?? $defaultFallbackToken
);
