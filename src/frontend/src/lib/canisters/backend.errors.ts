import type {AllowSigningError, ChallengeCompletionError} from '$declarations/backend/backend.did';
import {CanisterInternalError} from '$lib/canisters/errors';
import {type ApproveError, mapIcrc2ApproveError} from '@dfinity/ledger-icp';


export enum ChallengeCompletionErrorEnum {
    InvalidNonce = 'InvalidNonce',
    MissingChallenge = 'MissingChallenge',
    ExpiredChallenge = 'ExpiredChallenge',
    MissingUserProfile = 'MissingUserProfile',
    ChallengeAlreadySolved = 'ChallengeAlreadySolved',
    Unknown = 'Unknown'
}


export class PowChallengeError extends CanisterInternalError {
    public code: ChallengeCompletionErrorEnum;

    constructor(message: string, challengeCompletionError: ChallengeCompletionErrorEnum) {
        super(message);
        this.code = challengeCompletionError;
    }
}

export const mapAllowSigningError = (
    err: AllowSigningError
): CanisterInternalError | ApproveError | ChallengeCompletionError => {
    if ('ApproveError' in err) {
        return mapIcrc2ApproveError(err.ApproveError);
    }

    if ('FailedToContactCyclesLedger' in err) {
        return new CanisterInternalError('The Cycles Ledger cannot be contacted.');
    }

    if ('PowChallenge' in err) {
        const powError = err.PowChallenge;

        // Convert the backend Candid variant type to a strongly typed enum so we can easily handle it
        // when thrown
        if ('InvalidNonce' in powError) {
            return new PowChallengeError(
                'The provided nonce is valid.',
                ChallengeCompletionErrorEnum.InvalidNonce
            );
        }
        if ('MissingChallenge' in powError) {
            return new PowChallengeError(
                'No active challenge found.',
                ChallengeCompletionErrorEnum.MissingChallenge
            );
        }
        if ('ExpiredChallenge' in powError) {
            return new PowChallengeError(
                'The challange was not solved within the given timeframe. Reduce the difficulty or increase the expiary ' +
                'duration to avoid this issue from happening again',
                ChallengeCompletionErrorEnum.ExpiredChallenge
            );
        }
        if ('MissingUserProfile' in powError) {
            return new PowChallengeError(
                'User profile not found. Please create a profile first.',
                ChallengeCompletionErrorEnum.MissingUserProfile
            );
        }
        if ('ChallengeAlreadySolved' in powError) {
            return new PowChallengeError(
                'This challenge has already been solved.',
                ChallengeCompletionErrorEnum.ChallengeAlreadySolved
            );
        }

        // Fallback for any unknown PowChallenge error types
        return new PowChallengeError(
            `Unknown error: ${JSON.stringify(powError)}`,
            ChallengeCompletionErrorEnum.Unknown
        );
    }

    if ('Other' in err) {
        return new CanisterInternalError(err.Other);
    }

    return new CanisterInternalError('An uknown error occurred.');
};
