import type {
    PostMessageDataResponseExchangeSchema,
    PostMessageDataResponsePowProtectorNextAllowanceSchema,
    PostMessageDataResponsePowProtectorProgressSchema
} from '$lib/schema/post-message.schema';
import type * as z from 'zod';


export type PostMessageDataResponseExchange = z.infer<typeof PostMessageDataResponseExchangeSchema>;


export type PostMessageDataResponsePowProtectorProgress = z.infer<
    typeof PostMessageDataResponsePowProtectorProgressSchema
>;

export type PostMessageDataResponsePowProtectorNextAllowance = z.infer<
    typeof PostMessageDataResponsePowProtectorNextAllowanceSchema
>;
