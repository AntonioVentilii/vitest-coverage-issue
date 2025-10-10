import type {EthAddressError, PaymentError} from '$declarations/signer/signer.did';
import {CanisterInternalError} from '$lib/canisters/errors';
import {jsonReplacer} from '@dfinity/utils';

export class SignerCanisterPaymentError extends CanisterInternalError {
    constructor(err: PaymentError) {
        if ('UnsupportedPaymentType' in err) {
            super('Unsupported payment type');
        } else if ('LedgerWithdrawFromError' in err) {
            super(`Ledger error: ${JSON.stringify(err.LedgerWithdrawFromError.error, jsonReplacer)}`);
        } else if ('LedgerUnreachable' in err) {
            super(`Ledger unreachable: ${JSON.stringify(err.LedgerUnreachable, jsonReplacer)}`);
        } else if ('LedgerTransferFromError' in err) {
            super(`Ledger error: ${JSON.stringify(err.LedgerTransferFromError, jsonReplacer)}`);
        } else if ('InsufficientFunds' in err) {
            super(
                `Insufficient funds needed ${err.InsufficientFunds.needed} but available ${err.InsufficientFunds.available}`
            );
        } else {
            super('Unknown PaymentError');
        }
    }
}


export const mapSignerCanisterGetEthAddressError = (
    err: EthAddressError
): CanisterInternalError => {
    if ('SigningError' in err) {
        const [code, addOns] = err.SigningError;
        return new CanisterInternalError(
            `Signing error: ${JSON.stringify(code, jsonReplacer)} ${addOns}`
        );
    }

    if ('PaymentError' in err) {
        return new SignerCanisterPaymentError(err.PaymentError);
    }

    return new CanisterInternalError('Unknown GenericSigningError');
};
