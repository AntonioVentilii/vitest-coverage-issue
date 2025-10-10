import type {solTransactionTypes} from '$lib/schema/transaction.schema';
import type {SolAddress} from '$lib/types/address';
import type {TransactionId, TransactionType, TransactionUiCommon} from '$lib/types/transaction';
import type {Commitment, GetSignaturesForAddressApi, Signature} from '@solana/kit';

export type SolTransactionType = Extract<
    TransactionType,
    (typeof solTransactionTypes.options)[number]
>;

export interface SolTransactionUi extends TransactionUiCommon {
    id: TransactionId;
    signature: Signature;
    type: SolTransactionType;
    status: Commitment | null;
    value?: bigint;
    fee?: bigint;
    // For Solana transactions, we want to show the owner instead of the ATA address
    fromOwner?: SolAddress;
    toOwner?: SolAddress;
}
