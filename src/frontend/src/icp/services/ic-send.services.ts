import {transfer as transferIcrc} from '$icp/api/icrc-ledger.api';
import type {IcSendParams} from '$icp/types/ic-send';
import {invalidIcrcAddress} from '$icp/utils/icrc-account.utils';
import {ProgressStepsSendIc} from '$lib/enums/progress-steps';
import {i18n} from '$lib/stores/i18n.store';
import {decodeIcrcAccount, type IcrcBlockIndex} from '@dfinity/ledger-icrc';
import {get} from 'svelte/store';


export const sendIcrc = ({
                             to,
                             amount,
                             identity,
                             ledgerCanisterId,
                             progress
                         }: IcSendParams): Promise<IcrcBlockIndex> => {
    const validIcrcAddress = !invalidIcrcAddress(to);

    // UI validates addresses and disable form if not compliant. Therefore, this issue should unlikely happen.
    if (!validIcrcAddress) {
        throw new Error(get(i18n).send.error.invalid_destination);
    }

    progress?.(ProgressStepsSendIc.SEND);

    return transferIcrc({
        identity,
        ledgerCanisterId,
        to: decodeIcrcAccount(to),
        amount
    });
};
