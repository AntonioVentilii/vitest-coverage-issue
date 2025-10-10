import {IC_BUILTIN_TOKENS} from '$env/tokens/tokens.ic.env';
import {icrcTokens} from '$icp/derived/icrc.derived';
import type {IcTokenToggleable} from '$icp/types/ic-token-toggleable';
import {sortIcTokens} from '$icp/utils/icrc.utils';
import {derived, type Readable} from 'svelte/store';

// The entire list of ICRC tokens to display to the user:
// This includes the default tokens (disabled or enabled), the custom tokens (disabled or enabled),
// and the environment tokens that have never been used.
export const allIcrcTokens: Readable<IcTokenToggleable[]> = derived(
    [icrcTokens],
    ([$icrcTokens]) => {
        // The list of ICRC tokens (SNSes) is defined as environment variables.
        // These tokens are not necessarily loaded at boot time if the user has not added them to their list of custom tokens.
        const icrcEnvTokens: IcTokenToggleable[] =
            IC_BUILTIN_TOKENS.map((token) => ({...token, enabled: false})) ?? [];

        // All the Icrc ledger ids including the default tokens and the user custom tokens regardless if enabled or disabled.
        const knownLedgerCanisterIds = $icrcTokens.map(({ledgerCanisterId}) => ledgerCanisterId);

        return [
            ...$icrcTokens,
            ...icrcEnvTokens.filter(
                ({ledgerCanisterId}) => !knownLedgerCanisterIds.includes(ledgerCanisterId)
            )
        ].sort(sortIcTokens);
    }
);
