import {KongBackendCanister} from '$lib/canisters/kong_backend.canister';
import {KONG_BACKEND_CANISTER_ID} from '$lib/constants/app.constants';
import type {KongSwapParams} from '$lib/types/api';
import type {CanisterApiFunctionParams} from '$lib/types/canister';
import {Principal} from '@dfinity/principal';
import {assertNonNullish, isNullish} from '@dfinity/utils';

let canister: KongBackendCanister | undefined = undefined;


export const kongSwap = async ({
                                   identity,
                                   canisterId,
                                   nullishIdentityErrorMessage,
                                   ...restParams
                               }: CanisterApiFunctionParams<KongSwapParams>): Promise<bigint> => {
    const {swap} = await kongBackendCanister({identity, canisterId, nullishIdentityErrorMessage});

    return swap(restParams);
};


const kongBackendCanister = async ({
                                       identity,
                                       nullishIdentityErrorMessage,
                                       canisterId = KONG_BACKEND_CANISTER_ID
                                   }: CanisterApiFunctionParams): Promise<KongBackendCanister> => {
    assertNonNullish(identity, nullishIdentityErrorMessage);

    if (isNullish(canister)) {
        canister = await KongBackendCanister.create({
            identity,
            canisterId: Principal.fromText(canisterId)
        });
    }

    return canister;
};
