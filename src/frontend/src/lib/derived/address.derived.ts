import {
    btcAddressMainnetStore,
    btcAddressTestnetStore,
    ethAddressStore,
    solAddressDevnetStore,
    solAddressMainnetStore
} from '$lib/stores/address.store';
import type {
    BtcAddress,
    EthAddress,
    OptionBtcAddress,
    OptionEthAddress,
    OptionSolAddress,
    SolAddress
} from '$lib/types/address';
import {mapAddress} from '$lib/utils/address.utils';
import {derived, type Readable} from 'svelte/store';


export const btcAddressMainnet: Readable<OptionBtcAddress> = derived(
    [btcAddressMainnetStore],
    ([$btcAddressMainnetStore]) => mapAddress<BtcAddress>($btcAddressMainnetStore)
);

export const btcAddressTestnet: Readable<OptionBtcAddress> = derived(
    [btcAddressTestnetStore],
    ([$btcAddressTestnetStore]) => mapAddress<BtcAddress>($btcAddressTestnetStore)
);


export const ethAddress: Readable<OptionEthAddress> = derived(
    [ethAddressStore],
    ([$ethAddressStore]) => mapAddress<EthAddress>($ethAddressStore)
);


export const solAddressMainnet: Readable<OptionSolAddress> = derived(
    [solAddressMainnetStore],
    ([$solAddressMainnetStore]) => mapAddress<SolAddress>($solAddressMainnetStore)
);

export const solAddressDevnet: Readable<OptionSolAddress> = derived(
    [solAddressDevnetStore],
    ([$solAddressDevnetStore]) => mapAddress<SolAddress>($solAddressDevnetStore)
);
