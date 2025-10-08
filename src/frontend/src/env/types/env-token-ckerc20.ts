import type { EnvCkErc20TokensSchema } from '$env/schema/env-token-ckerc20.schema';
import type * as z from 'zod';

export type EnvCkErc20Tokens = z.infer<typeof EnvCkErc20TokensSchema>;
