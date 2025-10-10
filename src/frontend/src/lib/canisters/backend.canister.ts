import type {
    _SERVICE as BackendService,
    AddUserCredentialResult,
    AllowSigningResponse,
    Contact,
    CustomToken,
    UserProfile,
    UserToken
} from '$declarations/backend/backend.did';
import {idlFactory as idlCertifiedFactoryBackend} from '$declarations/backend/backend.factory.certified.did';
import {idlFactory as idlFactoryBackend} from '$declarations/backend/backend.factory.did';
import {getAgent} from '$lib/actors/agents.ic';
import {mapAllowSigningError} from '$lib/canisters/backend.errors';
import type {
    AddUserCredentialParams,
    AllowSigningParams,
    GetUserProfileResponse,
    SaveUserAgreements
} from '$lib/types/api';
import type {CreateCanisterOptions} from '$lib/types/canister';
import {mapBackendUserAgreements} from '$lib/utils/agreements.utils';
import {Canister, createServices, type QueryParams, toNullable} from '@dfinity/utils';

export class BackendCanister extends Canister<BackendService> {
    static async create({
                            identity,
                            ...options
                        }: CreateCanisterOptions<BackendService>): Promise<BackendCanister> {
        const agent = await getAgent({identity});

        const {service, certifiedService, canisterId} = createServices<BackendService>({
            options: {
                ...options,
                agent
            },
            idlFactory: idlFactoryBackend,
            certifiedIdlFactory: idlCertifiedFactoryBackend
        });

        return new BackendCanister(canisterId, service, certifiedService);
    }

    listUserTokens = ({certified = true}: QueryParams): Promise<UserToken[]> => {
        const {list_user_tokens} = this.caller({certified});

        return list_user_tokens();
    };

    listCustomTokens = ({certified = true}: QueryParams): Promise<CustomToken[]> => {
        const {list_custom_tokens} = this.caller({certified});

        return list_custom_tokens();
    };

    setManyCustomTokens = ({tokens}: { tokens: CustomToken[] }): Promise<void> => {
        const {set_many_custom_tokens} = this.caller({certified: true});

        return set_many_custom_tokens(tokens);
    };

    setCustomToken = ({token}: { token: CustomToken }): Promise<void> => {
        const {set_custom_token} = this.caller({certified: true});

        return set_custom_token(token);
    };

    setManyUserTokens = ({tokens}: { tokens: UserToken[] }): Promise<void> => {
        const {set_many_user_tokens} = this.caller({certified: true});

        return set_many_user_tokens(tokens);
    };


    createUserProfile = (): Promise<UserProfile> => {
        const {create_user_profile} = this.caller({certified: true});

        return create_user_profile();
    };

    getUserProfile = ({certified = true}: QueryParams): Promise<GetUserProfileResponse> => {
        const {get_user_profile} = this.caller({certified});

        return get_user_profile();
    };

    addUserCredential = ({
                             credentialJwt,
                             issuerCanisterId,
                             currentUserVersion,
                             credentialSpec
                         }: AddUserCredentialParams): Promise<AddUserCredentialResult> => {
        const {add_user_credential} = this.caller({certified: true});

        return add_user_credential({
            credential_jwt: credentialJwt,
            issuer_canister_id: issuerCanisterId,
            current_user_version: toNullable(currentUserVersion),
            credential_spec: credentialSpec
        });
    };


    allowSigning = async ({request}: AllowSigningParams = {}): Promise<AllowSigningResponse> => {
        const {allow_signing} = this.caller({certified: true});

        const response = await allow_signing(toNullable(request));

        if ('Ok' in response) {
            const {Ok} = response;
            return Ok;
        }

        throw mapAllowSigningError(response.Err);
    };


    updateUserAgreements = async ({
                                      agreements,
                                      currentUserVersion
                                  }: SaveUserAgreements): Promise<void> => {
        const {update_user_agreements} = this.caller({certified: true});

        await update_user_agreements({
            agreements: mapBackendUserAgreements(agreements),
            current_user_version: toNullable(currentUserVersion)
        });
    };


    getContacts = async (): Promise<Contact[]> => {
        const {get_contacts} = this.caller({certified: false});
        const response = await get_contacts();

        if ('Ok' in response) {
            return response.Ok;
        }
        throw response.Err;
    };

    createContact = async (name: string): Promise<Contact> => {
        const {create_contact} = this.caller({certified: true});
        const response = await create_contact({name, image: []});

        if ('Ok' in response) {
            return response.Ok;
        }
        throw response.Err;
    };


    updateContact = async (contact: Contact): Promise<Contact> => {
        const {update_contact} = this.caller({certified: true});
        const response = await update_contact(contact);

        if ('Ok' in response) {
            return response.Ok;
        }
        throw response.Err;
    };


}
