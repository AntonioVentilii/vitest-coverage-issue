import type {CertifiedStoreData} from '$lib/stores/certified.store';
import {type TransactionsData} from '$lib/stores/transactions.store';
import type {SolTransactionUi} from '$sol/types/sol-transaction';


export type SolTransactionsData = TransactionsData<SolTransactionUi>;

export type SolCertifiedTransactionsData = CertifiedStoreData<SolTransactionsData>;
