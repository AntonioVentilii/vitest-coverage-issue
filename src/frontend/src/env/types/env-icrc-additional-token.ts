import type { EnvAdditionalIcrcTokensSchema } from '$env/schema/env-additional-icrc-token.schema';
import type * as z from 'zod';

export type EnvAdditionalIcrcTokens = z.infer<typeof EnvAdditionalIcrcTokensSchema>;

