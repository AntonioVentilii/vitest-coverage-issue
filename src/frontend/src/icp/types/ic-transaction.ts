import type {icpTransactionTypes} from '$lib/schema/transaction.schema';
import type {TransactionId, TransactionType} from '$lib/types/transaction';


export type IcTransactionType = Extract<
    TransactionType,
    (typeof icpTransactionTypes.options)[number]
>;

export type IcTransactionIdText = string;

export type IcTransactionStatus = 'executed' | 'pending' | 'reimbursed' | 'failed';

export interface IcTransactionUi {
    id: TransactionId;
    type: IcTransactionType;
    // e.g. BTC Received
    typeLabel?: string;
    fee?: bigint;
    from?: string;
    // e.g. From: BTC Network
    fromLabel?: string;
    fromExplorerUrl?: string;
    to?: string;
    // e.g. To: BTC Network
    toLabel?: string;
    toExplorerUrl?: string;
    incoming?: boolean;
    value?: bigint;
    timestamp?: bigint;
    status: IcTransactionStatus;
    txExplorerUrl?: string;
    approveSpender?: string;
    approveExpiresAt?: bigint;
}
