import {token} from '$lib/stores/token.store';
import type {OptionTokenId} from '$lib/types/token';
import {derived, type Readable} from 'svelte/store';


export const tokenId: Readable<OptionTokenId> = derived([token], ([$token]) => $token?.id);
