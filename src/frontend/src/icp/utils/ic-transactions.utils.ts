import type {BtcStatusesData} from '$icp/stores/btc.store';
import type {CkBtcPendingUtxosData} from '$icp/stores/ckbtc-utxos.store';
import type {CkBtcMinterInfoData} from '$icp/stores/ckbtc.store';
import type {IcPendingTransactionsData} from '$icp/stores/ic-pending-transactions.store';
import type {IcCertifiedTransaction, IcCertifiedTransactionsData} from '$icp/stores/ic-transactions.store';
import type {IcTransactionUi} from '$icp/types/ic-transaction';
import {extendCkBTCTransaction, getCkBtcPendingUtxoTransactions} from '$icp/utils/ckbtc-transactions.utils';
import {getCkEthPendingTransactions} from '$icp/utils/cketh-transactions.utils';
import {isTokenCkBtcLedger} from '$icp/utils/ic-send.utils';
import type {CertifiedStoreData} from '$lib/stores/certified.store';
import type {CertifiedTransaction} from '$lib/stores/transactions.store';
import type {Token} from '$lib/types/token';


export const extendIcTransaction = ({
                                        transaction,
                                        btcStatuses,
                                        token
                                    }: {
    transaction: IcCertifiedTransaction;
    btcStatuses: BtcStatusesData | undefined;
    token: Token;
}): IcCertifiedTransaction => {
    if (isTokenCkBtcLedger(token)) {
        return extendCkBTCTransaction({
            transaction,
            btcStatuses
        });
    }

    return transaction;
};

export const getIcExtendedTransactions = ({
                                              token,
                                              icTransactionsStore,
                                              btcStatusesStore
                                          }: {
    token: Token;
    icTransactionsStore: IcCertifiedTransactionsData;
    btcStatusesStore: CertifiedStoreData<BtcStatusesData>;
}) =>
    (icTransactionsStore?.[token.id] ?? []).map((transaction) =>
        extendIcTransaction({
            transaction,
            token,
            btcStatuses: btcStatusesStore?.[token.id] ?? undefined
        })
    );

export const getAllIcTransactions = ({
                                         token,
                                         icTransactionsStore,
                                         btcStatusesStore,
                                         ckBtcMinterInfoStore,
                                         ckBtcPendingUtxosStore,
                                         icPendingTransactionsStore
                                     }: {
    token: Token;
    ckBtcPendingUtxoTransactions: CertifiedTransaction<IcTransactionUi>[];
    ckEthPendingTransactions: CertifiedTransaction<IcTransactionUi>[];
    icExtendedTransactions: CertifiedTransaction<IcTransactionUi>[];
    icTransactionsStore: IcCertifiedTransactionsData;
    btcStatusesStore: CertifiedStoreData<BtcStatusesData>;
    ckBtcMinterInfoStore: CertifiedStoreData<CkBtcMinterInfoData>;
    ckBtcPendingUtxosStore: CertifiedStoreData<CkBtcPendingUtxosData>;
    icPendingTransactionsStore: CertifiedStoreData<IcPendingTransactionsData>;
}) => [
    ...getCkBtcPendingUtxoTransactions({token, ckBtcPendingUtxosStore, ckBtcMinterInfoStore}),
    ...getCkEthPendingTransactions({token, icPendingTransactionsStore}),
    ...getIcExtendedTransactions({token, icTransactionsStore, btcStatusesStore})
];
