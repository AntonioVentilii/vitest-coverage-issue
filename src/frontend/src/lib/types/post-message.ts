import type {
    PostMessageDataErrorSchema,
    PostMessageDataResponseExchangeSchema,
    PostMessageDataResponsePowProtectorNextAllowanceSchema,
    PostMessageDataResponsePowProtectorProgressSchema,
    PostMessageResponseSchema,
    PostMessageResponseStatusSchema
} from '$lib/schema/post-message.schema';
import type * as z from 'zod';


export type PostMessageResponseStatus = z.infer<typeof PostMessageResponseStatusSchema>;

export type PostMessageResponse = z.infer<typeof PostMessageResponseSchema>;


export type PostMessageDataResponseExchange = z.infer<typeof PostMessageDataResponseExchangeSchema>;


export type PostMessageDataError = z.infer<typeof PostMessageDataErrorSchema>;


export type PostMessageDataResponsePowProtectorProgress = z.infer<
    typeof PostMessageDataResponsePowProtectorProgressSchema
>;

export type PostMessageDataResponsePowProtectorNextAllowance = z.infer<
    typeof PostMessageDataResponsePowProtectorNextAllowanceSchema
>;
