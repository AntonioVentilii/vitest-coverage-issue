import {ethAddressStore} from '$lib/stores/address.store';
import type {EthAddress, OptionEthAddress} from '$lib/types/address';
import {mapAddress} from '$lib/utils/address.utils';
import {derived, type Readable} from 'svelte/store';


export const ethAddress: Readable<OptionEthAddress> = derived(
    [ethAddressStore],
    ([$ethAddressStore]) => mapAddress<EthAddress>($ethAddressStore)
);
