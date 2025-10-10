import type { BtcTransactionUi, BtcWalletBalance } from '$btc/types/btc';
import type { PendingTransaction } from '$declarations/backend/backend.did';
import { ZERO } from '$lib/constants/app.constants';
import type { CertifiedData } from '$lib/types/store';
import { nonNullish, uint8ArrayToHexString } from '@dfinity/utils';


/**
 * Bitcoin txid to text representation requires inverting the array.
 *
 * @param txid Uint8Array | number[]
 * @returns string A human-readable transaction id.
 */
export const utxoTxIdToString = (txid: Uint8Array | number[]): string =>
	uint8ArrayToHexString(Uint8Array.from(txid).toReversed());





/**
 * Calculates Bitcoin wallet balance breakdown following standard Bitcoin accounting principles.
 *
 * Bitcoin balances are calculated based on Unspent Transaction Outputs (UTXOs):
 * - Confirmed Balance: Sum of UTXOs with sufficient block confirmations (typically 6+)
 * - Unconfirmed Balance: Sum of incoming UTXOs with 0-5 confirmations (in mempool or recent blocks)
 * - Locked Balance: Sum of confirmed UTXOs that are temporarily unspendable due to pending outgoing transactions
 * - Total Balance: Combined confirmed and unconfirmed balances (represents total Bitcoin ownership)
 *
 * The locked balance prevents double-spending by tracking UTXOs that are inputs to unconfirmed
 * outgoing transactions. These UTXOs remain on-chain but should not be available for new transactions
 * until the pending transaction is either confirmed or rejected.
 *
 * @param confirmedBalance - Sum of all confirmed UTXOs (from Bitcoin node/canister)
 * @param providerTransactions - Array of transaction data with confirmation status from external API (optional, null when certified=true)
 * @param pendingTransactions - Array of pending transactions, defaults to empty array if not provided
 * @returns Structured balance object with confirmed, unconfirmed, locked, and total amounts
 */
export const getBtcWalletBalance = ({
	balance,
	providerTransactions,
	pendingTransactions = []
}: {
	balance: bigint;
	providerTransactions: CertifiedData<BtcTransactionUi>[] | null;
	pendingTransactions?: PendingTransaction[];
}): BtcWalletBalance => {
	// Calculate locked balance: UTXOs being used as inputs in pending outgoing transactions
	// If pendingTransactions is empty (due to error or no data), locked balance will be 0
	const lockedBalance = pendingTransactions.reduce((sum, tx) => {
		// Safely calculate UTXO sum with additional error handling
		const txUtxoValue = nonNullish(tx.utxos)
			? tx.utxos.reduce((utxoSum, utxo) => {
					// Ensure utxo.value is valid before adding
					const utxoValue = nonNullish(utxo?.value) ? BigInt(utxo.value) : ZERO;
					return utxoSum + utxoValue;
				}, ZERO)
			: ZERO;

		return sum + txUtxoValue;
	}, ZERO);

	// Calculate unconfirmed incoming balance from external provider transaction data
	// This part is independent of pending transactions and should work even if pending data fails
	// When providerTransactions is null (certified=true), unconfirmedBalance will be 0
	const unconfirmedBalance = nonNullish(providerTransactions)
		? providerTransactions.reduce((sum, tx) => {
				if (
					tx.data.status === 'unconfirmed' &&
					tx.data.type === 'receive' &&
					nonNullish(tx.data.value)
				) {
					return sum + tx.data.value;
				}
				return sum;
			}, ZERO)
		: ZERO;

	const confirmedBalance = balance - lockedBalance;

	// Total balance represents the user's complete Bitcoin holdings
	// Even if pending data fails, this will still show confirmed + unconfirmed
	const totalBalance = balance + unconfirmedBalance;

	return {
		// Confirmed balance: UTXOs with sufficient confirmations, safe for spending
		confirmed: confirmedBalance > ZERO ? confirmedBalance : ZERO,
		// Unconfirmed balance: incoming transactions waiting for confirmations
		unconfirmed: unconfirmedBalance > ZERO ? unconfirmedBalance : ZERO,
		// Locked balance: confirmed UTXOs temporarily unavailable (0 if pending data unavailable)
		locked: lockedBalance > ZERO ? lockedBalance : ZERO,
		// Total balance: complete Bitcoin ownership (confirmed + unconfirmed)
		total: totalBalance > ZERO ? totalBalance : ZERO
	};
};
