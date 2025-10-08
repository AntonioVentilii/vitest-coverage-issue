import { BTC_MAINNET_TOKEN } from '$env/tokens/tokens.btc.env';
import { ETHEREUM_TOKEN } from '$env/tokens/tokens.eth.env';
import { SOLANA_TOKEN } from '$env/tokens/tokens.sol.env';
import type { AnyTransactionUiWithCmp } from '$lib/types/transaction';
import { mockBtcAddress } from '$tests/mocks/btc.mock';
import { mockEthAddress } from '$tests/mocks/eth.mock';
import { mockSolAddress } from '$tests/mocks/sol.mock';

export const createTransactionsUiWithCmp = (n: number): AnyTransactionUiWithCmp[] =>
	Array.from({ length: n }, (_, i) => ({
		transaction: {
			id: `id-${i}`,
			type: 'send',
			status: 'executed',
			transactionComponent: 'transactionComponent',
			timestamp: BigInt(i),
			from: 'from',
			to: 'to'
		},
		component: 'ic'
	}));
