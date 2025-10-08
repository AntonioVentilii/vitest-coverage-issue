import { ZERO } from '$lib/constants/app.constants';
import type { SolTransactionUi } from '$sol/types/sol-transaction';
import { signature } from '@solana/kit';

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

