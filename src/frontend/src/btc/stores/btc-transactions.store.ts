import type {BtcTransactionUi} from '$btc/types/btc';
import type {CertifiedStoreData} from '$lib/stores/certified.store';
import {type TransactionsData} from '$lib/stores/transactions.store';

export type BtcTransactionsData = TransactionsData<BtcTransactionUi>;

export type BtcCertifiedTransactionsData = CertifiedStoreData<BtcTransactionsData>;
