import {enabledBitcoinTokens} from '$btc/derived/tokens.derived';
import {BTC_MAINNET_TOKEN} from '$env/tokens/tokens.btc.env';
import {ETHEREUM_TOKEN} from '$env/tokens/tokens.eth.env';
import {ICP_TOKEN, TESTICP_TOKEN} from '$env/tokens/tokens.icp.env';
import {SOLANA_TOKEN} from '$env/tokens/tokens.sol.env';
import {erc1155Tokens} from '$eth/derived/erc1155.derived';
import {erc20Tokens} from '$eth/derived/erc20.derived';
import {erc721Tokens} from '$eth/derived/erc721.derived';
import {enabledEthereumTokens} from '$eth/derived/tokens.derived';
import {isDefaultEthereumToken} from '$eth/utils/eth.utils';
import {enabledEvmTokens} from '$evm/derived/tokens.derived';
import {icrcChainFusionDefaultTokens, sortedIcrcTokens} from '$icp/derived/icrc.derived';
import {defaultIcpTokens} from '$icp/derived/tokens.derived';
import type {NonFungibleToken} from '$lib/types/nft';
import type {Token, TokenToPin} from '$lib/types/token';
import {isTokenFungible} from '$lib/utils/nft.utils';
import {filterEnabledTokens} from '$lib/utils/tokens.utils';
import {splTokens} from '$sol/derived/spl.derived';
import {enabledSolanaTokens} from '$sol/derived/tokens.derived';
import {derived, type Readable} from 'svelte/store';

export const tokens: Readable<Token[]> = derived(
    [
        erc20Tokens,
        erc721Tokens,
        erc1155Tokens,
        sortedIcrcTokens,
        splTokens,
        defaultIcpTokens,
        enabledEthereumTokens,
        enabledBitcoinTokens,
        enabledSolanaTokens,
        enabledEvmTokens
    ],
    ([
         $erc20Tokens,
         $erc721Tokens,
         $erc1155Tokens,
         $icrcTokens,
         $splTokens,
         $defaultIcpTokens,
         $enabledEthereumTokens,
         $enabledBitcoinTokens,
         $enabledSolanaTokens,
         $enabledEvmTokens
     ]) => [
        ...$defaultIcpTokens,
        ...$enabledBitcoinTokens,
        ...$enabledEthereumTokens,
        ...$enabledSolanaTokens,
        ...$enabledEvmTokens,
        ...$erc20Tokens,
        ...$erc721Tokens,
        ...$erc1155Tokens,
        ...$icrcTokens,
        ...$splTokens
    ]
);

export const fungibleTokens: Readable<Token[]> = derived([tokens], ([$tokens]) =>
    $tokens.filter(isTokenFungible)
);

export const nonFungibleTokens: Readable<NonFungibleToken[]> = derived(
    [erc721Tokens, erc1155Tokens],
    ([$erc721Tokens, $erc1155Tokens]) => [...$erc721Tokens, ...$erc1155Tokens]
);

export const defaultEthereumTokens: Readable<Token[]> = derived([tokens], ([$tokens]) =>
    $tokens.filter((token) => isDefaultEthereumToken(token))
);

export const tokensToPin: Readable<TokenToPin[]> = derived(
    [icrcChainFusionDefaultTokens, defaultEthereumTokens],
    ([$icrcChainFusionDefaultTokens, $defaultEthereumTokens]) => [
        BTC_MAINNET_TOKEN,
        ETHEREUM_TOKEN,
        ICP_TOKEN,
        TESTICP_TOKEN,
        SOLANA_TOKEN,
        ...$icrcChainFusionDefaultTokens,
        ...$defaultEthereumTokens.filter((token) => token !== ETHEREUM_TOKEN)
    ]
);

/**
 * All user-enabled tokens.
 */
export const enabledTokens: Readable<Token[]> = derived([tokens], filterEnabledTokens);

/**
 * All user-enabled unique tokens symbols.
 */
export const enabledUniqueTokensSymbols: Readable<Token['symbol'][]> = derived(
    [enabledTokens],
    ([$enabledTokens]) => Array.from(new Set($enabledTokens.map(({symbol}) => symbol)))
);

/**
 * All user-enabled fungible tokens.
 */
export const enabledFungibleTokens: Readable<Token[]> = derived(
    [fungibleTokens],
    filterEnabledTokens
);
