import type {CustomToken, UserToken} from '$declarations/backend/backend.did';
import {BackendCanister} from '$lib/canisters/backend.canister';
import {BACKEND_CANISTER_ID} from '$lib/constants/app.constants';
import type {CanisterApiFunctionParams} from '$lib/types/canister';
import {Principal} from '@dfinity/principal';
import {assertNonNullish, isNullish, type QueryParams} from '@dfinity/utils';

let canister: BackendCanister | undefined = undefined;

export const listUserTokens = async ({
                                         identity,
                                         certified
                                     }: CanisterApiFunctionParams<QueryParams>): Promise<UserToken[]> => {
    const {listUserTokens} = await backendCanister({identity});

    return listUserTokens({certified});
};

export const listCustomTokens = async ({
                                           identity,
                                           certified
                                       }: CanisterApiFunctionParams<QueryParams>): Promise<CustomToken[]> => {
    const {listCustomTokens} = await backendCanister({identity});

    return listCustomTokens({certified});
};

export const setManyCustomTokens = async ({
                                              identity,
                                              tokens
                                          }: CanisterApiFunctionParams<{
    tokens: CustomToken[];
}>): Promise<void> => {
    const {setManyCustomTokens} = await backendCanister({identity});

    return setManyCustomTokens({tokens});
};


export const setManyUserTokens = async ({
                                            identity,
                                            tokens
                                        }: CanisterApiFunctionParams<{ tokens: UserToken[] }>): Promise<void> => {
    const {setManyUserTokens} = await backendCanister({identity});

    return setManyUserTokens({tokens});
};


const backendCanister = async ({
                                   identity,
                                   nullishIdentityErrorMessage,
                                   canisterId = BACKEND_CANISTER_ID
                               }: CanisterApiFunctionParams): Promise<BackendCanister> => {
    assertNonNullish(identity, nullishIdentityErrorMessage);

    if (isNullish(canister)) {
        canister = await BackendCanister.create({
            identity,
            canisterId: Principal.fromText(canisterId)
        });
    }

    return canister;
};
