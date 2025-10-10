import {enabledBitcoinTokens} from '$btc/derived/tokens.derived';
import {erc1155Tokens} from '$eth/derived/erc1155.derived';
import {erc20Tokens} from '$eth/derived/erc20.derived';
import {erc721Tokens} from '$eth/derived/erc721.derived';
import {enabledEthereumTokens} from '$eth/derived/tokens.derived';
import {enabledEvmTokens} from '$evm/derived/tokens.derived';
import {sortedIcrcTokens} from '$icp/derived/icrc.derived';
import {defaultIcpTokens} from '$icp/derived/tokens.derived';
import type {Token} from '$lib/types/token';
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
