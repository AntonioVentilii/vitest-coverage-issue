import type {CurrencyExchangeDataSchema} from '$lib/schema/currency.schema';
import type * as z from 'zod';


export type CurrencyExchangeData = z.infer<typeof CurrencyExchangeDataSchema>;
