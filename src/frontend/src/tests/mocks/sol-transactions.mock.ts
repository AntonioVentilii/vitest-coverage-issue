import { ZERO } from '$lib/constants/app.constants';
import {
	COMPUTE_BUDGET_PROGRAM_ADDRESS,
	SYSTEM_PROGRAM_ADDRESS,
	TOKEN_PROGRAM_ADDRESS
} from '$sol/constants/sol.constants';
import type { SolCertifiedTransaction } from '$sol/stores/sol-transactions.store';
import type { SolTransactionMessage } from '$sol/types/sol-send';
import type {
	SolRpcTransaction,
	SolSignedTransaction,
	SolTransactionUi
} from '$sol/types/sol-transaction';
import type { CompilableTransactionMessage } from '$sol/types/sol-transaction-message';
import { mockSolAddress, mockSolAddress2 } from '$tests/mocks/sol.mock';
import {
	address,
	blockhash,
	lamports,
	signature,
	stringifiedBigInt,
	stringifiedNumber,
	type Base58EncodedBytes,
	type Blockhash,
	type SignaturesMap,
	type TransactionMessageBytes,
	type UnixTimestamp
} from '@solana/kit';

const mockSignature =
	'4UjEjyVYfPNkr5TzZ3oH8ZS8PiEzbHsBdhvRtrLiuBfk8pQMRNvY3UUxjHe4nSzxAnhd8JCSQ3YYmAj651ZWeArM';

export const createMockSolTransactionsUi = (n: number): SolTransactionUi[] =>
	Array.from({ length: n }, () => createMockSolTransactionUi(`txn-${n}`));

export const createMockSolTransactionUi = (id: string): SolTransactionUi => ({
	id,
	signature: signature(mockSignature),
	timestamp: ZERO,
	type: 'send',
	value: 100n,
	from: 'sender',
	to: 'receiver',
	status: 'finalized'
});

