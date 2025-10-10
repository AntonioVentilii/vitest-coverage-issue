import type {EthSignTransactionRequest} from '$declarations/signer/signer.did';
import {SignerCanister} from '$lib/canisters/signer.canister';
import {SIGNER_CANISTER_ID} from '$lib/constants/app.constants';
import type {SignWithSchnorrParams} from '$lib/types/api';
import type {CanisterApiFunctionParams} from '$lib/types/canister';
import {Principal} from '@dfinity/principal';
import {assertNonNullish, isNullish} from '@dfinity/utils';

let canister: SignerCanister | undefined = undefined;


export const signTransaction = async ({
                                          transaction,
                                          identity
                                      }: CanisterApiFunctionParams<{
    transaction: EthSignTransactionRequest;
}>): Promise<string> => {
    const {signTransaction} = await signerCanister({identity});

    return signTransaction({transaction});
};


export const signWithSchnorr = async ({
                                          identity,
                                          ...rest
                                      }: CanisterApiFunctionParams<SignWithSchnorrParams>): Promise<Uint8Array | number[]> => {
    const {signWithSchnorr} = await signerCanister({identity});

    return await signWithSchnorr(rest);
};

const signerCanister = async ({
                                  identity,
                                  nullishIdentityErrorMessage,
                                  canisterId = SIGNER_CANISTER_ID
                              }: CanisterApiFunctionParams): Promise<SignerCanister> => {
    assertNonNullish(identity, nullishIdentityErrorMessage);

    if (isNullish(canister)) {
        canister = await SignerCanister.create({
            identity,
            canisterId: Principal.fromText(canisterId)
        });
    }

    return canister;
};
