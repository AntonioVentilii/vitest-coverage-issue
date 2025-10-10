import type {_SERVICE as BackendService, CustomToken, UserToken} from '$declarations/backend/backend.did';
import {idlFactory as idlCertifiedFactoryBackend} from '$declarations/backend/backend.factory.certified.did';
import {idlFactory as idlFactoryBackend} from '$declarations/backend/backend.factory.did';
import {getAgent} from '$lib/actors/agents.ic';
import type {CreateCanisterOptions} from '$lib/types/canister';
import {Canister, createServices, type QueryParams} from '@dfinity/utils';

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


    setManyUserTokens = ({tokens}: { tokens: UserToken[] }): Promise<void> => {
        const {set_many_user_tokens} = this.caller({certified: true});

        return set_many_user_tokens(tokens);
    };


}
