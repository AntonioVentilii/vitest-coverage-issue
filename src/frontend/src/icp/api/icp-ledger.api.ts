import {getAgent} from '$lib/actors/agents.ic';
import type {CanisterIdText} from '$lib/types/canister';
import type {OptionIdentity} from '$lib/types/identity';
import type {Identity} from '@dfinity/agent';
import {AccountIdentifier, type BlockHeight, LedgerCanister} from '@dfinity/ledger-icp';
import {Principal} from '@dfinity/principal';
import {assertNonNullish} from '@dfinity/utils';

export const transfer = async ({
                                   identity,
                                   to,
                                   amount,
                                   ledgerCanisterId
                               }: {
    identity: OptionIdentity;
    to: string;
    amount: bigint;
    ledgerCanisterId: CanisterIdText;
}): Promise<BlockHeight> => {
    assertNonNullish(identity);

    const {transfer} = await ledgerCanister({identity, ledgerCanisterId});

    return transfer({
        to: AccountIdentifier.fromHex(to),
        amount
    });
};


const ledgerCanister = async ({
                                  identity,
                                  ledgerCanisterId
                              }: {
    identity: Identity;
    ledgerCanisterId: CanisterIdText;
}): Promise<LedgerCanister> => {
    const agent = await getAgent({identity});

    return LedgerCanister.create({
        agent,
        canisterId: Principal.fromText(ledgerCanisterId)
    });
};
