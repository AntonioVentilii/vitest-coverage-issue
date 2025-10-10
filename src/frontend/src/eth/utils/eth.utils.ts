import {SUPPORTED_ETHEREUM_TOKEN_IDS} from '$env/tokens/tokens.eth.env';
import type {OptionToken, TokenId} from '$lib/types/token';
import {nonNullish} from '@dfinity/utils';

export const isDefaultEthereumToken = (token: OptionToken): boolean =>
    nonNullish(token) && token.category === 'default' && token.standard === 'ethereum';


export const isSupportedEthTokenId = (tokenId: TokenId): boolean =>
    SUPPORTED_ETHEREUM_TOKEN_IDS.includes(tokenId);
