import {routeNetwork} from '$lib/derived/nav.derived';
import {networks} from '$lib/derived/networks.derived';
import type {NetworkId} from '$lib/types/network';
import {
    isNetworkIdArbitrum,
    isNetworkIdBase,
    isNetworkIdBitcoin,
    isNetworkIdBsc,
    isNetworkIdEthereum,
    isNetworkIdPolygon,
    isNetworkIdSolana
} from '$lib/utils/network.utils';
import {nonNullish} from '@dfinity/utils';
import {derived, type Readable} from 'svelte/store';

export const networkId: Readable<NetworkId | undefined> = derived(
    [networks, routeNetwork],
    ([$networks, $routeNetwork]) =>
        nonNullish($routeNetwork)
            ? $networks.find(({id}) => id.description === $routeNetwork)?.id
            : undefined
);


export const networkBitcoin: Readable<boolean> = derived([networkId], ([$networkId]) =>
    isNetworkIdBitcoin($networkId)
);

export const networkEthereum: Readable<boolean> = derived([networkId], ([$networkId]) =>
    isNetworkIdEthereum($networkId)
);


export const networkBase: Readable<boolean> = derived([networkId], ([$networkId]) =>
    isNetworkIdBase($networkId)
);

export const networkBsc: Readable<boolean> = derived([networkId], ([$networkId]) =>
    isNetworkIdBsc($networkId)
);

export const networkPolygon: Readable<boolean> = derived([networkId], ([$networkId]) =>
    isNetworkIdPolygon($networkId)
);

export const networkArbitrum: Readable<boolean> = derived([networkId], ([$networkId]) =>
    isNetworkIdArbitrum($networkId)
);

export const networkSolana: Readable<boolean> = derived([networkId], ([$networkId]) =>
    isNetworkIdSolana($networkId)
);
