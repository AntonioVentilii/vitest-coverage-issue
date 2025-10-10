import type {EthereumNetwork} from '$eth/types/network';
import type {IcToken} from '$icp/types/ic-token';
import type {Token, TokenId, TokenStandard} from '$lib/types/token';
import {type Readable, writable} from 'svelte/store';

export type ReceiveTokenStoreData = IcToken;

export interface ReceiveTokenStore extends Readable<ReceiveTokenStoreData> {
    set: (data: ReceiveTokenStoreData) => void;
}

const initReceiveTokenStore = (token: IcToken): ReceiveTokenStore => {
    const {subscribe, set} = writable<ReceiveTokenStoreData>(token);

    return {
        subscribe,
        set
    };
};


export type LoadTokenAndOpenModal = (openModal: () => Promise<void>) => Promise<void>;
export type CloseModalAndResetToken = () => void;

export interface ReceiveTokenContext {
    token: ReceiveTokenStore;
    tokenId: Readable<TokenId>;
    tokenStandard: Readable<TokenStandard>;

    ckEthereumTwinToken: Readable<Token>;
    ckEthereumTwinTokenNetwork: Readable<EthereumNetwork>;

    open: LoadTokenAndOpenModal;
    close: CloseModalAndResetToken;
}
