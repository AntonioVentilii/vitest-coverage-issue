import type {SolAddress} from '$lib/types/address';
import {solanaHttpRpc} from '$sol/providers/sol-rpc.providers';
import type {SolanaNetworkType} from '$sol/types/network';
import type {SolanaGetAccountInfoReturn} from '$sol/types/sol-rpc';
import type {SolSignature} from '$sol/types/sol-transaction';
import type {SplTokenAddress} from '$sol/types/spl';
import {isNullish, nonNullish} from '@dfinity/utils';
import {address as solAddress} from '@solana/kit';


export const getRpcTransaction = async ({
                                            signature: {signature},
                                            network
                                        }: {
    signature: SolSignature;
    network: SolanaNetworkType;
}) => {
    const {getTransaction} = solanaHttpRpc(network);

    return await getTransaction(signature, {
        maxSupportedTransactionVersion: 0,
        encoding: 'jsonParsed'
    }).send();
};


const addressToAccountInfo = new Map<
    SolanaNetworkType,
    Map<SolAddress, SolanaGetAccountInfoReturn>
>();

export const getAccountInfo = async ({
                                         address,
                                         network
                                     }: {
    address: SolAddress;
    network: SolanaNetworkType;
}) => {
    const addressMap =
        addressToAccountInfo.get(network) ?? new Map<SolAddress, SolanaGetAccountInfoReturn>();

    addressToAccountInfo.set(network, addressMap);

    const cachedInfo = addressMap.get(address);

    if (nonNullish(cachedInfo)) {
        return cachedInfo;
    }

    const {getAccountInfo} = solanaHttpRpc(network);

    const info = await getAccountInfo(solAddress(address), {encoding: 'jsonParsed'}).send();

    addressMap.set(address, info);

    return info;
};

export const getTokenInfo = async ({
                                       address,
                                       network
                                   }: {
    address: SplTokenAddress;
    network: SolanaNetworkType;
}): Promise<{
    owner: SplTokenAddress | undefined;
    decimals: number;
    mintAuthority?: SplTokenAddress;
    freezeAuthority?: SplTokenAddress;
}> => {
    const {value} = await getAccountInfo({address, network});

    const {owner, data} = value ?? {};

    if (isNullish(data) || !('parsed' in data)) {
        return {owner, decimals: 0};
    }

    const {parsed} = data;

    if (isNullish(parsed?.info)) {
        return {owner, decimals: 0};
    }

    const {decimals, mintAuthority, freezeAuthority} = parsed.info as {
        decimals?: number;
        mintAuthority?: SplTokenAddress;
        freezeAuthority?: SplTokenAddress;
    };

    return {owner, decimals: decimals ?? 0, mintAuthority, freezeAuthority};
};
