import {SUPPORTED_EVM_NETWORKS} from '$env/networks/networks-evm/networks.evm.env';
import {SUPPORTED_ETHEREUM_NETWORKS} from '$env/networks/networks.eth.env';
import {ALCHEMY_API_KEY} from '$env/rest/alchemy.env';
import type {AlchemyProviderContract} from '$eth/types/alchemy-contract';
import type {Erc1155Metadata} from '$eth/types/erc1155';
import type {Erc721Metadata} from '$eth/types/erc721';
import {i18n} from '$lib/stores/i18n.store';
import type {EthAddress} from '$lib/types/address';
import type {WebSocketListener} from '$lib/types/listener';
import type {NetworkId} from '$lib/types/network';
import type {TransactionResponseWithBigInt} from '$lib/types/transaction';
import {replacePlaceholders} from '$lib/utils/i18n.utils';
import {assertNonNullish, isNullish, nonNullish} from '@dfinity/utils';
import {Alchemy, type AlchemyEventType, type AlchemySettings, AlchemySubscription, type Network} from 'alchemy-sdk';
import type {Listener} from 'ethers/utils';
import {get} from 'svelte/store';

type AlchemyConfig = Pick<AlchemySettings, 'apiKey' | 'network'>;

const configs: Record<NetworkId, AlchemyConfig> = [
    ...SUPPORTED_ETHEREUM_NETWORKS,
    ...SUPPORTED_EVM_NETWORKS
].reduce<Record<NetworkId, AlchemyConfig>>(
    (acc, {id, providers: {alchemy: _, alchemyDeprecated}}) => ({
        ...acc,
        [id]: {
            apiKey: ALCHEMY_API_KEY,
            network: alchemyDeprecated
        }
    }),
    {}
);

const alchemyConfig = (networkId: NetworkId): AlchemyConfig => {
    const provider = configs[networkId];

    assertNonNullish(
        provider,
        replacePlaceholders(get(i18n).init.error.no_alchemy_config, {
            $network: networkId.toString()
        })
    );

    return provider;
};


export const initPendingTransactionsListener = ({
                                                    toAddress,
                                                    listener,
                                                    networkId,
                                                    hashesOnly = false
                                                }: {
    toAddress: EthAddress;
    listener: Listener;
    networkId: NetworkId;
    hashesOnly?: boolean;
}): WebSocketListener => {
    let provider: Alchemy | null = new Alchemy(alchemyConfig(networkId));

    const event: AlchemyEventType = {
        method: AlchemySubscription.PENDING_TRANSACTIONS,
        toAddress,
        hashesOnly
    };

    provider.ws.on(event, listener);

    return {
        // eslint-disable-next-line require-await
        disconnect: async () => {
            // Alchemy is buggy. Despite successfully removing all listeners, attaching new similar events would have the effect of doubling the triggers. That's why we reset it to null.
            provider?.ws.off(event);
            provider?.ws.removeAllListeners();
            provider = null;
        }
    };
};

export class AlchemyProvider {
    /**
     * TODO: Remove this class in favor of the new provider when we remove completely alchemy-sdk
     * @deprecated This approach works for now but does not align with the new architectural requirements.
     */
    private readonly deprecatedProvider: Alchemy;

    constructor(private readonly network: Network) {
        this.deprecatedProvider = new Alchemy({
            apiKey: ALCHEMY_API_KEY,
            network: this.network
        });
    }

    getTransaction = async (hash: string): Promise<TransactionResponseWithBigInt | null> => {
        const transaction = await this.deprecatedProvider.core.getTransaction(hash);

        if (isNullish(transaction)) {
            return transaction;
        }

        const {value, gasLimit, gasPrice, chainId, ...rest} = transaction;

        return {
            ...rest,
            value: value.toBigInt(),
            gasLimit: gasLimit.toBigInt(),
            gasPrice: gasPrice?.toBigInt(),
            chainId: BigInt(chainId)
        };
    };


    // https://www.alchemy.com/docs/reference/nft-api-endpoints/nft-api-endpoints/nft-metadata-endpoints/get-contract-metadata-v-3
    getContractMetadata = async (address: EthAddress): Promise<Erc1155Metadata | Erc721Metadata> => {
        const result: AlchemyProviderContract =
            await this.deprecatedProvider.nft.getContractMetadata(address);

        const tokenStandard =
            result.tokenType === 'ERC721'
                ? 'erc721'
                : result.tokenType === 'ERC1155'
                    ? 'erc1155'
                    : undefined;

        if (isNullish(tokenStandard)) {
            throw new Error('Invalid token standard');
        }

        const maybeName =
            nonNullish(result.openSeaMetadata?.collectionName) &&
            !result.openSeaMetadata?.collectionName.toLowerCase().includes('unidentified')
                ? result.openSeaMetadata?.collectionName
                : nonNullish(result.name)
                    ? result.name
                    : undefined;

        return {
            ...(nonNullish(maybeName) && {name: maybeName}),
            ...(nonNullish(result.symbol) && {symbol: result.symbol}),
            ...(nonNullish(result.openSeaMetadata?.description) && {
                description: result.openSeaMetadata.description
            }),
            decimals: 0
        };
    };
}

const providers: Record<NetworkId, AlchemyProvider> = [
    ...SUPPORTED_ETHEREUM_NETWORKS,
    ...SUPPORTED_EVM_NETWORKS
].reduce<Record<NetworkId, AlchemyProvider>>(
    (acc, {id, providers: {alchemy: _, alchemyDeprecated}}) => ({
        ...acc,
        [id]: new AlchemyProvider(alchemyDeprecated)
    }),
    {}
);

export const alchemyProviders = (networkId: NetworkId): AlchemyProvider => {
    const provider = providers[networkId];

    assertNonNullish(
        provider,
        replacePlaceholders(get(i18n).init.error.no_alchemy_provider, {
            $network: networkId.toString()
        })
    );

    return provider;
};
