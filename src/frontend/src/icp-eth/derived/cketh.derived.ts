import {ETHEREUM_TOKEN} from '$env/tokens/tokens.eth.env';
import {enabledEthereumTokens} from '$eth/derived/tokens.derived';
import type {IcCkToken} from '$icp/types/ic-token';
import {DEFAULT_ETHEREUM_TOKEN} from '$lib/constants/tokens.constants';
import {tokenWithFallback} from '$lib/derived/token.derived';
import type {Token} from '$lib/types/token';
import {derived, type Readable} from 'svelte/store';


/**
 * On ckETH, we need to know if the target for conversion is Ethereum mainnet or Sepolia.
 */
export const ckEthereumTwinToken: Readable<Token> = derived(
    [tokenWithFallback],
    ([$tokenWithFallback]) => ($tokenWithFallback as IcCkToken)?.twinToken ?? ETHEREUM_TOKEN
);


/**
 * The fees to convert from Erc20 to ckErc20 or Eth to ckEth are covered by Ethereum (mainnet or sepolia) - i.e. not in erc20 value.
 * Likewise, when we load ckEth minter information we only load those once per network for any ckErc20 and ckEth given that it contains the information for all Ethereum related tokens.
 */
export const ckEthereumNativeToken: Readable<Token> = derived(
    [enabledEthereumTokens, ckEthereumTwinToken],
    ([
         $enabledEthereumTokens,
         {
             network: {id}
         }
     ]) =>
        $enabledEthereumTokens.find(({network: {id: networkId}}) => id === networkId) ??
        DEFAULT_ETHEREUM_TOKEN
);
