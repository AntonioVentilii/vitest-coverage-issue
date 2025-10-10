// https://www.coingecko.com/api/documentation

// We are only interested in specific coin <> USD for now, therefore not an exhaustive list.
// *refers to curl -l https://api.coingecko.com/api/v3/coins/list
import type {LedgerCanisterIdText} from '$icp/types/canister';
import type {Currency} from '$lib/enums/currency';
import type {EthAddress} from '$lib/types/address';
import type {CoingeckoCoinsIdSchema} from '$lib/validation/coingecko.validation';
import type * as z from 'zod';

export type CoingeckoCoinsId = z.infer<typeof CoingeckoCoinsIdSchema>;

// We are interested only in the ERC20 <> USD on Ethereum and in the ICRC <> USD on Internet Computer, therefore not an exhaustive list.
// *refers to curl -l https://api.coingecko.com/api/v3/asset_platforms
export type CoingeckoPlatformId =
    | 'ethereum'
    | 'internet-computer'
    | 'solana'
    | 'base'
    | 'binance-smart-chain'
    | 'polygon-pos'
    | 'arbitrum-one';


export type CoingeckoSimplePrice = {
    usd: number;
    usd_market_cap?: number;
    usd_24h_vol?: number;
    usd_24h_change?: number;
    last_updated_at?: number;
} & {
    [K in Exclude<`${Currency}`, Currency.USD>]?: number;
};

export type CoingeckoSimpleTokenPrice = Omit<CoingeckoSimplePrice, 'usd_market_cap'> &
    Required<Pick<CoingeckoSimplePrice, 'usd_market_cap'>>;

export type CoingeckoResponse<T> = Record<CoingeckoCoinsId | LedgerCanisterIdText | EthAddress, T>;

export type CoingeckoSimplePriceResponse = CoingeckoResponse<CoingeckoSimplePrice>;

export type CoingeckoSimpleTokenPriceResponse = CoingeckoResponse<CoingeckoSimpleTokenPrice>;

export type CoingeckoPriceResponse =
    | CoingeckoSimplePriceResponse
    | CoingeckoSimpleTokenPriceResponse;
