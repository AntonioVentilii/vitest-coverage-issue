import { icTransactionsStore } from '$icp/stores/ic-transactions.store';
import { TRACK_COUNT_IC_LOADING_TRANSACTIONS_ERROR } from '$lib/constants/analytics.contants';
import { trackEvent } from '$lib/services/analytics.services';
import { balancesStore } from '$lib/stores/balances.store';
import { i18n } from '$lib/stores/i18n.store';
import { toastsError } from '$lib/stores/toasts.store';
import type { TokenId } from '$lib/types/token';
import { mapIcErrorMetadata } from '$lib/utils/error.utils';
import { get } from 'svelte/store';


export const onLoadTransactionsError = ({
	tokenId,
	error: err
}: {
	tokenId: TokenId;
	error: unknown;
}) => {
	icTransactionsStore.reset(tokenId);

	// We get transactions and balance for the same end point therefore if getting certified transactions fails, it also means the balance is incorrect.
	balancesStore.reset(tokenId);

	trackEvent({
		name: TRACK_COUNT_IC_LOADING_TRANSACTIONS_ERROR,
		metadata: {
			tokenId: tokenId.description ?? '',
			...(mapIcErrorMetadata(err) ?? {})
		}
	});

	// We print the error to console just for debugging purposes
	console.warn(`${get(i18n).transactions.error.loading_transactions}:`, err);
	return;
};

export const onTransactionsCleanUp = (data: { tokenId: TokenId; transactionIds: string[] }) => {
	icTransactionsStore.cleanUp(data);

	toastsError({
		msg: {
			text: get(i18n).transactions.error.uncertified_transactions_removed
		}
	});
};
