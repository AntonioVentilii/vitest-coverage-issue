import type {IndexCanisterIdText} from '$icp/types/canister';
import {getAgent} from '$lib/actors/agents.ic';
import type {OptionIdentity} from '$lib/types/identity';
import type {Identity} from '@dfinity/agent';
import {IcrcIndexNgCanister, type IcrcNgStatus} from '@dfinity/ledger-icrc';
import {Principal} from '@dfinity/principal';
import {assertNonNullish, type QueryParams} from '@dfinity/utils';


export const getStatus = async ({
                                    identity,
                                    indexCanisterId,
                                    certified = true
                                }: {
    identity: OptionIdentity;
    indexCanisterId: IndexCanisterIdText;
} & QueryParams): Promise<IcrcNgStatus> => {
    assertNonNullish(identity);

    const {status} = await indexNgCanister({identity, indexCanisterId});

    return status({certified});
};
const indexNgCanister = async ({
                                   identity,
                                   indexCanisterId
                               }: {
    identity: Identity;
    indexCanisterId: IndexCanisterIdText;
}): Promise<IcrcIndexNgCanister> => {
    const agent = await getAgent({identity});

    return IcrcIndexNgCanister.create({
        agent,
        canisterId: Principal.fromText(indexCanisterId)
    });
};
