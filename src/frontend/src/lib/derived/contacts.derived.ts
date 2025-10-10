import {contactsStore} from '$lib/stores/contacts.store';
import type {ContactUi, ExtendedAddressContactUiMap} from '$lib/types/contact';
import {nonNullish} from '@dfinity/utils';
import {derived, type Readable} from 'svelte/store';


export const contacts: Readable<ContactUi[]> = derived([contactsStore], ([$contactsStore]) =>
    nonNullish($contactsStore) ? $contactsStore : []
);


export const extendedAddressContacts: Readable<ExtendedAddressContactUiMap> = derived(
    [contacts],
    ([$contacts]) =>
        $contacts.reduce<ExtendedAddressContactUiMap>(
            (acc, {addresses, id, ...rest}) => ({
                ...acc,
                [`${id}`]: {
                    ...rest,
                    id,
                    addresses: addresses.map((address) => ({
                        ...address,
                        id: crypto.randomUUID().toString()
                    }))
                }
            }),
            {}
        )
);
