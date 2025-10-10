import {routeNetwork} from '$lib/derived/nav.derived';
import {networks} from '$lib/derived/networks.derived';
import type {NetworkId} from '$lib/types/network';
import {nonNullish} from '@dfinity/utils';
import {derived, type Readable} from 'svelte/store';

export const networkId: Readable<NetworkId | undefined> = derived(
    [networks, routeNetwork],
    ([$networks, $routeNetwork]) =>
        nonNullish($routeNetwork)
            ? $networks.find(({id}) => id.description === $routeNetwork)?.id
            : undefined
);
