import type {EnvIcrcTokenMetadata} from '$env/types/env-icrc-token';
import type {IcToken, IcTokenWithoutId} from '$icp/types/ic-token';
import type {CustomToken} from '$lib/types/custom-token';

export type IcrcCustomTokenExtra = Pick<EnvIcrcTokenMetadata, 'alternativeName'>;

export type IcTokenExtended = IcToken & IcrcCustomTokenExtra;

export type IcTokenWithoutIdExtended = IcTokenWithoutId & IcrcCustomTokenExtra;

export type IcrcCustomToken = CustomToken<IcToken> & IcrcCustomTokenExtra;
