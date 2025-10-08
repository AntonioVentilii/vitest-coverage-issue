import dAppDescriptionsJson from '$env/dapp-descriptions.json';
import { type OisyDappDescription, OisyDappDescriptionSchema } from '$lib/types/dapp-description';
import * as z from 'zod';

const parseResult = z.array(OisyDappDescriptionSchema).safeParse(dAppDescriptionsJson);
export const dAppDescriptions: OisyDappDescription[] = parseResult.success ? parseResult.data : [];
