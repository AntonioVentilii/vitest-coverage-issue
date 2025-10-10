import type { Token } from '$lib/types/token';

export interface WalletWorker {
	start: () => void;
	stop: () => void;
	trigger: () => void;
	destroy: () => void;
}

export type InitWalletWorkerFn<T extends Token = Token> = (params: {
	token: T;
}) => Promise<WalletWorker>;

export interface WebSocketListener {
	disconnect: () => Promise<void>;
}
