import type { CampaignEligibility } from '$lib/types/reward';
import { type Readable, writable } from 'svelte/store';

export interface RewardEligibilityData {
	campaignEligibilities?: CampaignEligibility[] | undefined;
}

export interface RewardEligibilityStore extends Readable<RewardEligibilityData> {
	setCampaignEligibilities: (campaignEligibilities: CampaignEligibility[]) => void;
}

export const initRewardEligibilityStore = (): RewardEligibilityStore => {
	const { subscribe, set } = writable<RewardEligibilityData>({ campaignEligibilities: undefined });

	return {
		subscribe,

		setCampaignEligibilities: (campaignEligibilities: CampaignEligibility[]) => {
			set({ campaignEligibilities });
		}
	};
};
