import type {BtcWithdrawalStatuses} from '$icp/types/btc';
import type {CertifiedData} from '$lib/types/store';

export type BtcAddressData = CertifiedData<string>;

export type BtcStatusesData = CertifiedData<BtcWithdrawalStatuses>;
