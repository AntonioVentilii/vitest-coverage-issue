import type { IcTransactionUi } from '$icp/types/ic-transaction';
import { bn1Bi, bn3Bi } from '$tests/mocks/balances.mock';

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



