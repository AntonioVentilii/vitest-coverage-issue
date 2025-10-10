import {CurrencyExchangeDataSchema} from '$lib/schema/currency.schema';
import type {CoingeckoSimplePriceResponse, CoingeckoSimpleTokenPriceResponse} from '$lib/types/coingecko';
import * as z from 'zod';


export const PostMessageDataResponseSchema = z.strictObject({});


// TODO: generate zod schema for Coingecko
export const PostMessageDataResponseExchangeSchema = PostMessageDataResponseSchema.extend({
    currentExchangeRate: CurrencyExchangeDataSchema.optional(),
    currentEthPrice: z.custom<CoingeckoSimplePriceResponse>(),
    currentBtcPrice: z.custom<CoingeckoSimplePriceResponse>(),
    currentErc20Prices: z.custom<CoingeckoSimpleTokenPriceResponse>(),
    currentIcpPrice: z.custom<CoingeckoSimplePriceResponse>(),
    currentIcrcPrices: z.custom<CoingeckoSimpleTokenPriceResponse>(),
    currentSolPrice: z.custom<CoingeckoSimplePriceResponse>(),
    currentSplPrices: z.custom<CoingeckoSimpleTokenPriceResponse>(),
    currentBnbPrice: z.custom<CoingeckoSimplePriceResponse>(),
    currentPolPrice: z.custom<CoingeckoSimplePriceResponse>()
});


export const PostMessageDataResponsePowProtectorProgressSchema =
    PostMessageDataResponseSchema.extend({
        progress: z.enum(['REQUEST_CHALLENGE', 'SOLVE_CHALLENGE', 'GRANT_CYCLES'])
    });

export const PostMessageDataResponsePowProtectorNextAllowanceSchema =
    PostMessageDataResponseSchema.extend({
        nextAllowanceMs: z.custom<bigint>().optional()
    });
