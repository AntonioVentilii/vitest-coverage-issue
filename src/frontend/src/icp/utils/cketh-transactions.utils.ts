import type {IcPendingTransactionsData} from '$icp/stores/ic-pending-transactions.store';
import {isTokenCkErc20Ledger, isTokenCkEthLedger} from '$icp/utils/ic-send.utils';
import type {CertifiedStoreData} from '$lib/stores/certified.store';
import type {Token} from '$lib/types/token';


export const getCkEthPendingTransactions = ({
                                                token,
                                                icPendingTransactionsStore
                                            }: {
    token: Token;
    icPendingTransactionsStore: CertifiedStoreData<IcPendingTransactionsData>;
}) => {
    if (!isTokenCkEthLedger(token) && !isTokenCkErc20Ledger(token)) {
        return [];
    }

    return icPendingTransactionsStore?.[token.id] ?? [];
};
