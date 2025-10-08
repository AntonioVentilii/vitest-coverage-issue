import type { EnvIcrcTokenMetadataSchema, EnvIcrcTokenMetadataWithIconSchema } from '$env/schema/env-icrc-token.schema';
import type * as z from 'zod';

export type EnvIcrcTokenMetadata = z.infer<typeof EnvIcrcTokenMetadataSchema>;


export type EnvIcrcTokenMetadataWithIcon = z.infer<typeof EnvIcrcTokenMetadataWithIconSchema>;
