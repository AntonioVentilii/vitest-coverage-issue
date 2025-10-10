import type {ContractAddress} from '$eth/types/address';
import type {EthereumNetwork} from '$eth/types/network';
import type {CustomTokenSection} from '$lib/enums/custom-token-section';
import type {RequiredToken, Token, TokenMetadata, TokenStandard} from '$lib/types/token';

type Erc1155Standard = Extract<TokenStandard, 'erc1155'>;

export type Erc1155Token = Erc1155Contract &
    Omit<Token, 'network' | 'standard'> & {
    network: EthereumNetwork;
    standard: Erc1155Standard;
    section?: CustomTokenSection;
    allowExternalContentSource?: boolean;
};

export type RequiredErc1155Token = RequiredToken<
    Omit<Erc1155Token, 'section' | 'allowExternalContentSource'>
>;

export type Erc1155ContractAddress = ContractAddress;
export type Erc1155Contract = Erc1155ContractAddress;

export type Erc1155Metadata = Omit<TokenMetadata, 'name' | 'symbol'> & {
    name?: string;
    symbol?: string;
};


type UriJsonPrimitive = string | number | boolean;

type NestedUriJsonValue = UriJsonPrimitive | UriJsonPrimitive[] | NestedUriJsonPropertyMap;

interface NestedUriJsonPropertyMap {
    [key: string]: NestedUriJsonValue;
}
