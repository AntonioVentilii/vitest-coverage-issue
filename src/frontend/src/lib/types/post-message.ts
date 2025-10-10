import type {
    PostMessageDataErrorSchema,
    PostMessageDataRequestDip20Schema,
    PostMessageDataRequestExchangeTimerSchema,
    PostMessageDataRequestIcCkBTCUpdateBalanceSchema,
    PostMessageDataRequestSchema,
    PostMessageDataResponseBTCAddressSchema,
    PostMessageDataResponseExchangeErrorSchema,
    PostMessageDataResponseExchangeSchema,
    PostMessageDataResponsePowProtectorNextAllowanceSchema,
    PostMessageDataResponsePowProtectorProgressSchema,
    PostMessageDataResponseWalletCleanUpSchema,
    PostMessageResponseSchema,
    PostMessageResponseStatusSchema
} from '$lib/schema/post-message.schema';
import type * as z from 'zod';

export type PostMessageDataRequest = z.infer<typeof PostMessageDataRequestSchema>;


export type PostMessageDataRequestExchangeTimer = z.infer<
    typeof PostMessageDataRequestExchangeTimerSchema
>;


export type PostMessageDataRequestDip20 = z.infer<typeof PostMessageDataRequestDip20Schema>;


export type PostMessageDataRequestIcCkBTCUpdateBalance = z.infer<
    typeof PostMessageDataRequestIcCkBTCUpdateBalanceSchema
>;


export type PostMessageResponseStatus = z.infer<typeof PostMessageResponseStatusSchema>;

export type PostMessageResponse = z.infer<typeof PostMessageResponseSchema>;


export type PostMessageDataResponseExchange = z.infer<typeof PostMessageDataResponseExchangeSchema>;

export type PostMessageDataResponseExchangeError = z.infer<
    typeof PostMessageDataResponseExchangeErrorSchema
>;


export type PostMessageDataError = z.infer<typeof PostMessageDataErrorSchema>;

export type PostMessageDataResponseWalletCleanUp = z.infer<
    typeof PostMessageDataResponseWalletCleanUpSchema
>;


export type PostMessageDataResponseBTCAddress = z.infer<
    typeof PostMessageDataResponseBTCAddressSchema
>;

export type PostMessageDataResponsePowProtectorProgress = z.infer<
    typeof PostMessageDataResponsePowProtectorProgressSchema
>;

export type PostMessageDataResponsePowProtectorNextAllowance = z.infer<
    typeof PostMessageDataResponsePowProtectorNextAllowanceSchema
>;
