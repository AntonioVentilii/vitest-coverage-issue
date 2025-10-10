import type {
    IcCanistersSchema,
    IcCkInterfaceSchema,
    IcCkLinkedAssetsSchema,
    IcCkTokenSchema,
    IcFeeSchema,
    IcInterfaceSchema,
    IcTokenSchema,
    IcTokenWithoutIdSchema
} from '$icp/schema/ic-token.schema';
import type * as z from 'zod';

export type IcFee = z.infer<typeof IcFeeSchema>;

export type IcCanisters = z.infer<typeof IcCanistersSchema>;


export type IcCkLinkedAssets = z.infer<typeof IcCkLinkedAssetsSchema>;


export type IcInterface = z.infer<typeof IcInterfaceSchema>;

export type IcToken = z.infer<typeof IcTokenSchema>;

export type IcTokenWithoutId = z.infer<typeof IcTokenWithoutIdSchema>;

export type IcCkToken = z.infer<typeof IcCkTokenSchema>;

export type IcCkInterface = z.infer<typeof IcCkInterfaceSchema>;


export enum IcTokenStandards {
    icrc1 = 'ICRC-1',
    icrc2 = 'ICRC-2'
}
