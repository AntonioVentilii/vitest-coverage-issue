import type {NetworksSettings, Settings, UserProfile} from '$declarations/backend/backend.did';
import {userProfileStore} from '$lib/stores/user-profile.store';
import {fromNullishNullable} from '@dfinity/utils';
import {derived, type Readable} from 'svelte/store';


export const userProfile: Readable<UserProfile | undefined> = derived(
    [userProfileStore],
    ([$userProfile]) => $userProfile?.profile
);


export const userSettings: Readable<Settings | undefined> = derived(
    [userProfile],
    ([$userProfile]) => fromNullishNullable($userProfile?.settings)
);

export const userSettingsNetworks: Readable<NetworksSettings | undefined> = derived(
    [userSettings],
    ([$userSettings]) => $userSettings?.networks
);
