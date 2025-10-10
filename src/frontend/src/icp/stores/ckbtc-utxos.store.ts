import type {CertifiedData} from '$lib/types/store';
import type {PendingUtxo} from '@dfinity/ckbtc';

export type CkBtcPendingUtxosData = CertifiedData<PendingUtxo[]>;
