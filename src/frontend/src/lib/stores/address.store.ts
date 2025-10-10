import type {Address, EthAddress} from '$lib/types/address';
import type {CertifiedData} from '$lib/types/store';
import type {Option} from '$lib/types/utils';
import {type Readable, writable} from 'svelte/store';

type CertifiedAddressData<T extends Address> = CertifiedData<T>;

export type AddressStoreData<T extends Address> = Option<CertifiedAddressData<T>>;

export interface AddressStore<T extends Address> extends Readable<AddressStoreData<T>> {
    set: (data: CertifiedAddressData<T>) => void;
    reset: () => void;
}

const initAddressStore = <T extends Address>(): AddressStore<T> => {
    const {subscribe, set} = writable<AddressStoreData<T>>(undefined);

    return {
        set: (data: CertifiedAddressData<T>) => set(data),
        reset: () => set(null),
        subscribe
    };
};


export const ethAddressStore = initAddressStore<EthAddress>();
