import type {BtcTransactionUi} from '$btc/types/btc';

export const mockBtcTransactionUi: BtcTransactionUi = {
    blockNumber: 123213,
    from: 'bc1q3jlulk7pw9p5tjqcrwdec9a6vdaw9pqhw0wg4g',
    id: 'e793cab7e155a0e8f825c4609548faf759c57715fecac587580a1d716bb2b89e',
    status: 'confirmed',
    timestamp: 1727175987n,
    to: ['bc1qt0nkp96r7p95xfacyp98pww2eu64yzuf78l4a2wy0sttt83hux4q6u2nl7'],
    type: 'receive',
    value: 126527n,
    confirmations: 1
};

export const createMockBtcTransactionsUi = (n: number): BtcTransactionUi[] =>
    Array.from({length: n}, () => ({
        ...mockBtcTransactionUi,
        blockNumber: Math.floor(Math.random() * 100000),
        id: crypto.randomUUID(),
        timestamp: BigInt(Math.floor(Math.random() * 100000)),
        value: BigInt(Math.floor(Math.random() * 100000))
    }));
