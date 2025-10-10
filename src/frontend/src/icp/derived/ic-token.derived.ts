import type { IcToken } from '$icp/types/ic-token';
import { tokenWithFallback } from '$lib/derived/token.derived';
import { derived, type Readable } from 'svelte/store';


export const tokenWithFallbackAsIcToken: Readable<IcToken> = derived(
	[tokenWithFallback],
	([$token]) => $token as IcToken
);


