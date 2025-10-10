import {derived, type Readable, writable, type Writable} from 'svelte/store';

export interface HeroContext {
    loading: Writable<boolean>;
    loaded: Readable<boolean>;
    outflowActionsDisabled: Writable<boolean>;
}

export const initHeroContext = (): HeroContext => {
    const loading = writable<boolean>(true);
    const loaded = derived(loading, ($loading) => !$loading);

    const outflowActionsDisabled = writable<boolean>(true);

    return {
        loading,
        loaded,
        outflowActionsDisabled
    };
};
