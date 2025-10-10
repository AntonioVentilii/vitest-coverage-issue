import type {EligibilityReport, RewardInfo} from '$declarations/rewards/rewards.did';
import {getUserInfo as getUserInfoApi, isEligible as isEligibleApi} from '$lib/api/reward.api';
import {ZERO} from '$lib/constants/app.constants';
import {QrCodeType} from '$lib/enums/qr-code-types';
import {i18n} from '$lib/stores/i18n.store';
import {toastsError} from '$lib/stores/toasts.store';
import type {RewardResponseInfo, RewardsResponse, UserRoleResult} from '$lib/types/reward';
import type {Identity} from '@dfinity/agent';
import {fromNullable, isNullish, nonNullish} from '@dfinity/utils';
import {get} from 'svelte/store';

const queryEligibilityReport = async (params: {
    identity: Identity;
    certified: boolean;
}): Promise<EligibilityReport> =>
    await isEligibleApi({
        ...params,
        nullishIdentityErrorMessage: get(i18n).auth.error.no_internet_identity
    });


const queryUserRoles = async (params: {
    identity: Identity;
    certified: boolean;
}): Promise<UserRoleResult> => {
    const userData = await getUserInfoApi({
        ...params,
        nullishIdentityErrorMessage: get(i18n).auth.error.no_internet_identity
    });

    const superpowers = fromNullable(userData.superpowers);
    if (isNullish(superpowers)) {
        return {isVip: false, isGold: false};
    }

    return {
        isVip: superpowers.includes(QrCodeType.VIP),
        isGold: superpowers.includes(QrCodeType.GOLD)
    };
};


const queryRewards = async (params: {
    identity: Identity;
    certified: boolean;
}): Promise<RewardsResponse> => {
    const {usage_awards, last_snapshot_timestamp} = await getUserInfoApi({
        ...params,
        nullishIdentityErrorMessage: get(i18n).auth.error.no_internet_identity
    });

    const awards: RewardInfo[] | undefined = fromNullable(usage_awards);

    return {
        rewards: nonNullish(awards) ? awards.map(mapRewardsInfo) : [],
        lastTimestamp: fromNullable(last_snapshot_timestamp) ?? ZERO
    };
};

const mapRewardsInfo = ({
                            name,
                            campaign_name,
                            campaign_id,
                            ...rest
                        }: RewardInfo): RewardResponseInfo => ({
    ...rest,
    name: fromNullable(name),
    campaignName: fromNullable(campaign_name),
    campaignId: campaign_id
});

/**
 * Gets the rewards the user received.
 *
 * This function performs **always** a query (not certified) to get the rewards of a user.
 *
 * @async
 * @param {Object} params - The parameters required to load the user data.
 * @param {Identity} params.identity - The user's identity for authentication.
 * @returns {Promise<RewardsResponse>} - Resolves with the received rewards and the last timestamp of the user.
 *
 * @throws {Error} Displays an error toast and returns an empty list of rewards if the query fails.
 */
export const getRewards = async (params: { identity: Identity }): Promise<RewardsResponse> => {
    try {
        return await queryRewards({...params, certified: false});
    } catch (err: unknown) {
        const {vip} = get(i18n);
        toastsError({
            msg: {text: vip.reward.error.loading_user_data},
            err
        });
    }

    return {rewards: [], lastTimestamp: ZERO};
};
