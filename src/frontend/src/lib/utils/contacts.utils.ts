import type {ContactUi} from '$lib/types/contact';
import type {NetworkContacts} from '$lib/types/contacts';
import type {TokenAccountIdTypes} from '$lib/types/token-account-id';
import {getNetworkContactKey} from '$lib/utils/contact.utils';
import {isNullish} from '@dfinity/utils';

export const getNetworkContacts = ({
                                       addressType,
                                       contacts
                                   }: {
    addressType: TokenAccountIdTypes;
    contacts: ContactUi[];
}): NetworkContacts =>
    isNullish(contacts)
        ? {}
        : contacts.reduce<NetworkContacts>((acc, contact) => {
            contact.addresses.forEach(({addressType: contactAddressType, address}) => {
                const key = getNetworkContactKey({contact, address});

                if (contactAddressType === addressType && isNullish(acc[key])) {
                    acc[key] = {
                        address,
                        contact
                    };
                }
            });

            return acc;
        }, {});
