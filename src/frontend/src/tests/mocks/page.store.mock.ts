import {page} from '$app/state';
import {resetRouteParams, type RouteParams} from '$lib/utils/nav.utils';
import type {Page} from '@sveltejs/kit';
import {writable} from 'svelte/store';

const initialStoreValue = {
    data: resetRouteParams(),
    route: {
        id: null
    },
    params: {}
};

const initPageStoreMock = () => {
    const {subscribe, set} = writable<Partial<Page>>(initialStoreValue);

    const resetPageState = () => {
        page.data = initialStoreValue.data;
        page.route = initialStoreValue.route;
        page.params = initialStoreValue.params;
    };

    resetPageState();

    return {
        subscribe,
        mock: (data: Partial<RouteParams>) => {
            set({...page, data});
            page.data = data;
        },


        reset: () => {
            set(initialStoreValue);
            resetPageState();
        }
    };
};

export const mockPage = initPageStoreMock();
