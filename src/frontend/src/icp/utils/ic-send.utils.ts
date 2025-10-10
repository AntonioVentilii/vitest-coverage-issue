import {
    CKBTC_LEDGER_CANISTER_IDS,
    CKERC20_LEDGER_CANISTER_IDS,
    CKETH_LEDGER_CANISTER_IDS
} from '$env/networks/networks.icrc.env';
import type {IcToken} from '$icp/types/ic-token';
import type {CanisterIdText} from '$lib/types/canister';
import {nonNullish} from '@dfinity/utils';

const isTokenLedger = ({
                           token: {ledgerCanisterId},
                           ledgerCanisterIds
                       }: {
    token: Partial<IcToken>;
    ledgerCanisterIds: CanisterIdText[];
}): boolean => nonNullish(ledgerCanisterId) && ledgerCanisterIds.includes(ledgerCanisterId);

export const isTokenCkBtcLedger = (token: Partial<IcToken>): boolean =>
    isTokenLedger({token, ledgerCanisterIds: CKBTC_LEDGER_CANISTER_IDS});

export const isTokenCkEthLedger = (token: Partial<IcToken>): boolean =>
    isTokenLedger({token, ledgerCanisterIds: CKETH_LEDGER_CANISTER_IDS});

export const isTokenCkErc20Ledger = (token: Partial<IcToken>): boolean =>
    isTokenLedger({token, ledgerCanisterIds: CKERC20_LEDGER_CANISTER_IDS});
