import {
	IC_CKBTC_LEDGER_CANISTER_ID,
	IC_CKETH_LEDGER_CANISTER_ID
} from '$env/networks/networks.icrc.env';
import { BTC_MAINNET_TOKEN } from '$env/tokens/tokens.btc.env';
import { ETHEREUM_TOKEN } from '$env/tokens/tokens.eth.env';
import { ICP_TOKEN } from '$env/tokens/tokens.icp.env';
import { ckBtcPendingUtxosStore } from '$icp/stores/ckbtc-utxos.store';
import { ckBtcMinterInfoStore } from '$icp/stores/ckbtc.store';
import { icPendingTransactionsStore } from '$icp/stores/ic-pending-transactions.store';
import { icTransactionsStore } from '$icp/stores/ic-transactions.store';
import type { IcCkToken } from '$icp/types/ic-token';
import type { IcTransactionUi } from '$icp/types/ic-transaction';
import type { Token, TokenId } from '$lib/types/token';
import { bn1Bi, bn3Bi } from '$tests/mocks/balances.mock';
import { mockCkBtcMinterInfo, mockCkBtcPendingUtxoTransaction } from '$tests/mocks/ckbtc.mock';
import { createCertifiedIcTransactionUiMock } from '$tests/utils/transactions-stores.test-utils';
import type { PendingUtxo } from '@dfinity/ckbtc';

export const createMockIcTransactionsUi = (n: number): IcTransactionUi[] =>
	Array.from({ length: n }, () => ({
		id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
		type: 'send',
		status: 'executed',
		value: bn3Bi,
		fee: bn1Bi,
		from: 'dndtm-gk4kn-ssvos-asuit-2q33x-lgtpj-5bnoi-v5ync-m4iza-xclem-mae',
		to: 'cmpd6-ywgum-ofyfa-masyv-v3gba-il2hu-upwxw-xhdq3-mzkhx-zfhpb-7ae',
		timestamp: 1_747_732_396_194_882_329n
	}));



