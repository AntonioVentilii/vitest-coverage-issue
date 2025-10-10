import type {_SERVICE as SignerService, EthSignTransactionRequest} from '$declarations/signer/signer.did';
import {idlFactory as idlCertifiedFactorySigner} from '$declarations/signer/signer.factory.certified.did';
import {idlFactory as idlFactorySigner} from '$declarations/signer/signer.factory.did';
import {getAgent} from '$lib/actors/agents.ic';
import {SIGNER_PAYMENT_TYPE} from '$lib/canisters/signer.constants';
import {mapSignerCanisterGetEthAddressError} from '$lib/canisters/signer.errors';
import type {SignWithSchnorrParams} from '$lib/types/api';
import type {CreateCanisterOptions} from '$lib/types/canister';
import {mapDerivationPath} from '$lib/utils/signer.utils';
import {Canister, createServices, fromDefinedNullable} from '@dfinity/utils';

export class SignerCanister extends Canister<SignerService> {
    static async create({
                            identity,
                            ...options
                        }: CreateCanisterOptions<SignerService>): Promise<SignerCanister> {
        const agent = await getAgent({identity});

        const {service, certifiedService, canisterId} = createServices<SignerService>({
            options: {
                ...options,
                agent
            },
            idlFactory: idlFactorySigner,
            certifiedIdlFactory: idlCertifiedFactorySigner
        });

        return new SignerCanister(canisterId, service, certifiedService);
    }


    signTransaction = async ({
                                 transaction
                             }: {
        transaction: EthSignTransactionRequest;
    }): Promise<string> => {
        const {eth_sign_transaction} = this.caller({
            certified: true
        });

        const response = await eth_sign_transaction(transaction, [SIGNER_PAYMENT_TYPE]);

        // If the response does not match the type signature, so has neither `Ok` nor `Err`,
        // will typescript have thrown an error before this point?  Ditto for the other APIs.
        // It seems safer to check for `Ok` in response, and always throw an error if it's not there.

        if ('Ok' in response) {
            const {
                Ok: {signature}
            } = response;
            return signature;
        }

        throw mapSignerCanisterGetEthAddressError(response.Err);
    };


    signWithSchnorr = async ({
                                 message,
                                 derivationPath,
                                 keyId
                             }: SignWithSchnorrParams): Promise<Uint8Array | number[]> => {
        const {schnorr_sign} = this.caller({
            certified: true
        });

        const response = await schnorr_sign(
            {
                key_id: keyId,
                derivation_path: mapDerivationPath(derivationPath),
                message
            },
            [SIGNER_PAYMENT_TYPE]
        );

        if ('Ok' in response) {
            const {signature} = fromDefinedNullable(response.Ok);
            return signature;
        }

        // TODO: map error like the other methods when SchnorrSignError is exposed in the Signer repo
        throw response.Err;
    };
}
