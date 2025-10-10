import {ICPSwapPoolCanister} from '$lib/canisters/icp-swap-pool.canister';
import type {ICPSwapDepositWithdrawParams, ICPSwapQuoteSwapParams} from '$lib/types/api';
import type {CanisterApiFunctionParamsWithCanisterId} from '$lib/types/canister';
import {Principal} from '@dfinity/principal';
import {assertNonNullish} from '@dfinity/utils';

const getPoolCanister = async ({
                                   identity,
                                   canisterId,
                                   nullishIdentityErrorMessage
                               }: CanisterApiFunctionParamsWithCanisterId): Promise<ICPSwapPoolCanister> => {
    assertNonNullish(identity, nullishIdentityErrorMessage);

    return await ICPSwapPoolCanister.create({
        identity,
        canisterId: Principal.fromText(canisterId)
    });
};


export const swap = async ({
                               identity,
                               canisterId,
                               ...restParams
                           }: CanisterApiFunctionParamsWithCanisterId<ICPSwapQuoteSwapParams>): Promise<bigint> => {
    const pool = await getPoolCanister({identity, canisterId});
    return pool.swap(restParams);
};

export const deposit = async ({
                                  identity,
                                  canisterId,
                                  ...restParams
                              }: CanisterApiFunctionParamsWithCanisterId<ICPSwapDepositWithdrawParams>): Promise<bigint> => {
    const {deposit} = await getPoolCanister({identity, canisterId});
    return deposit(restParams);
};


export const withdraw = async ({
                                   identity,
                                   canisterId,
                                   ...restParams
                               }: CanisterApiFunctionParamsWithCanisterId<ICPSwapDepositWithdrawParams>): Promise<bigint> => {
    const {withdraw} = await getPoolCanister({identity, canisterId});
    return withdraw(restParams);
};
