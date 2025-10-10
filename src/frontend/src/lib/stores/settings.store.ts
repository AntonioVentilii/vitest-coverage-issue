import {initStorageStore} from '$lib/stores/storage.store';

export interface SettingsData {
    enabled: boolean;
}


export const privacyModeStore = initStorageStore<SettingsData>({
    key: 'privacy-mode',
    defaultValue: {enabled: false}
});


export type NftSortOrder = 'asc' | 'desc';
export type NftSortType = 'collection-name' | 'date';

export interface NftSortingType {
    order: NftSortOrder;
    type: NftSortType;
}
