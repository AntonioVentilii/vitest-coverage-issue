import { nativeEthereumTokenId } from '$eth/derived/token.derived';
import { ethTransactionsStore } from '$eth/stores/eth-transactions.store';
import { mapEthTransactionUi } from '$eth/utils/transactions.utils';
import { ckEthMinterInfoStore } from '$icp-eth/stores/cketh.store';
import { toCkMinterInfoAddresses } from '$icp-eth/utils/cketh.utils';
import { ethAddress } from '$lib/derived/address.derived';
import { tokenWithFallback } from '$lib/derived/token.derived';
import { tokens } from '$lib/derived/tokens.derived';
import type { TokenId } from '$lib/types/token';
import type { AnyTransactionUiWithToken } from '$lib/types/transaction';
import { getKnownDestinations } from '$lib/utils/transactions.utils';
import { nonNullish } from '@dfinity/utils';
import { derived, type Readable } from 'svelte/store';


export const ethTransactionsInitialized: Readable<boolean> = derived(
	[ethTransactionsStore, tokenWithFallback],
	([$ethTransactionsStore, { id: $tokenId }]) => nonNullish($ethTransactionsStore?.[$tokenId])
);


derived(
	[
		ethTransactionsStore,
		ckEthMinterInfoStore,
		nativeEthereumTokenId,
		ethAddress,
		tokens,
		tokenWithFallback
	],
	([
		$ethTransactionsStore,
		$ckEthMinterInfoStore,
		$ethereumTokenId,
		$ethAddress,
		$tokens,
		$tokenWithFallback
	]) => {
		const ckMinterInfoAddresses = toCkMinterInfoAddresses(
			$ckEthMinterInfoStore?.[$ethereumTokenId]
		);

		if (ckMinterInfoAddresses.length === 0) {
			return {};
		}

		const mappedTransactions: AnyTransactionUiWithToken[] = [];
		Object.getOwnPropertySymbols($ethTransactionsStore ?? {}).forEach((tokenId) => {
			const token = $tokens.find(({ id }) => id === tokenId);

			if (nonNullish(token) && token.network.id === $tokenWithFallback.network.id) {
				($ethTransactionsStore?.[tokenId as TokenId] ?? []).forEach(({ data: transaction }) => {
					mappedTransactions.push({
						...mapEthTransactionUi({
							transaction,
							ckMinterInfoAddresses,
							ethAddress: $ethAddress
						}),
						token
					});
				});
			}
		});

		return getKnownDestinations(mappedTransactions);
	}
);
