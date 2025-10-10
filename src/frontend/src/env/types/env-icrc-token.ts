import type {EnvIcrcTokenMetadataSchema} from '$env/schema/env-icrc-token.schema';
import type * as z from 'zod';

export type EnvIcrcTokenMetadata = z.infer<typeof EnvIcrcTokenMetadataSchema>;
