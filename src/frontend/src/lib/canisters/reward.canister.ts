import type {_SERVICE as RewardService, EligibilityReport, UserData} from '$declarations/rewards/rewards.did';
import {idlFactory as idlCertifiedFactoryReward} from '$declarations/rewards/rewards.factory.certified.did';
import {idlFactory as idlFactoryReward} from '$declarations/rewards/rewards.factory.did';
import {getAgent} from '$lib/actors/agents.ic';
import type {CreateCanisterOptions} from '$lib/types/canister';
import {EligibilityError} from '$lib/types/errors';
import {Canister, createServices, type QueryParams, toNullable} from '@dfinity/utils';

export class RewardCanister extends Canister<RewardService> {
    static async create({
                            identity,
                            ...options
                        }: CreateCanisterOptions<RewardService>): Promise<RewardCanister> {
        const agent = await getAgent({identity});

        const {service, certifiedService, canisterId} = createServices<RewardService>({
            options: {
                ...options,
                agent
            },
            idlFactory: idlFactoryReward,
            certifiedIdlFactory: idlCertifiedFactoryReward
        });

        return new RewardCanister(canisterId, service, certifiedService);
    }

    isEligible = async ({certified = true}: QueryParams): Promise<EligibilityReport> => {
        const {eligible} = this.caller({certified});

        const response = await eligible(toNullable());

        if ('Ok' in response) {
            return response.Ok;
        }
        if ('Err' in response) {
            throw new EligibilityError();
        }
        throw new Error('Unknown error');
    };

    getUserInfo = ({certified = true}: QueryParams): Promise<UserData> => {
        const {user_info} = this.caller({certified});

        return user_info();
    };


}
