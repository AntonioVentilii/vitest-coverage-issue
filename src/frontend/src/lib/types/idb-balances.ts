import type {NetworkId} from '$lib/types/network';
import type {TokenId} from '$lib/types/token';
import type {Principal} from '@dfinity/principal';


export interface GetIdbBalancesParams {
    principal: Principal;
    tokenId: TokenId;
    networkId: NetworkId;
}
