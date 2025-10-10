import {IcCkTokenSchema, IcTokenSchema} from '$icp/schema/ic-token.schema';
import type {IcCkToken, IcToken} from '$icp/types/ic-token';
import type {Token} from '$lib/types/token';

export const isIcToken = (token: Token): token is IcToken => {
    const {success} = IcTokenSchema.safeParse(token);
    return success;
};


export const isIcCkToken = (token: Token): token is IcCkToken => {
    const {success} = IcCkTokenSchema.safeParse(token);
    return success;
};
