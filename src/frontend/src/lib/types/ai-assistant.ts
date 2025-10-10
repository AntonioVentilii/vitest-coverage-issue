import type {Address} from '$lib/types/address';
import type {ContactAddressUiWithId, ExtendedAddressContactUi} from '$lib/types/contact';
import type {Network} from '$lib/types/network';
import type {Token, TokenStandard, TokenUi} from '$lib/types/token';


export interface ToolCallArgument {
    name: string;
    value: string;
}


export interface ShowContactsToolResult {
    contacts: ExtendedAddressContactUi[];
}

export interface ReviewSendTokensToolResult {
    amount: number;
    token: Token;
    sendCompleted: boolean;
    id: string;
    contact?: ExtendedAddressContactUi;
    contactAddress?: ContactAddressUiWithId;
    address?: Address;
}

export interface ShowBalanceToolResult {
    mainCard: {
        totalUsdBalance: number;
        token?: TokenUi;
        network?: Network;
    };
    secondaryCards?: TokenUi[];
}


export interface AiAssistantContactUi
    extends Omit<ExtendedAddressContactUi, 'addresses' | 'image' | 'updateTimestampNs' | 'id'> {
    addresses: (Omit<ContactAddressUiWithId, 'address'> & {
        acceptedTokenStandards: TokenStandard[];
    })[];
}

export type AiAssistantContactUiMap = Record<string, AiAssistantContactUi>;

export type AiAssistantToken = Pick<Token, 'name' | 'symbol' | 'standard'> & {
    networkId: string;
};
