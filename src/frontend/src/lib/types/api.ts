import type {
    AllowSigningRequest,
    Contact,
    CredentialSpec,
    GetUserProfileError,
    UserProfile
} from '$declarations/backend/backend.did';
import type {TxId} from '$declarations/kong_backend/kong_backend.did';
import type {SchnorrKeyId} from '$declarations/signer/signer.did';
import type {IcToken} from '$icp/types/ic-token';
import type {Address} from '$lib/types/address';
import type {Token} from '$lib/types/token';
import type {UserAgreements} from '$lib/types/user-agreements';
import type {Identity} from '@dfinity/agent';
import type {Principal} from '@dfinity/principal';

export interface AddUserCredentialParams {
    credentialJwt: string;
    issuerCanisterId: Principal;
    currentUserVersion?: bigint;
    credentialSpec: CredentialSpec;
}

export type GetUserProfileResponse = { Ok: UserProfile } | { Err: GetUserProfileError };

export interface AllowSigningParams {
    request?: AllowSigningRequest;
}


export interface GetSchnorrPublicKeyParams {
    derivationPath: string[];
    keyId: SchnorrKeyId;
}

export interface SignWithSchnorrParams extends GetSchnorrPublicKeyParams {
    message: number[];
}


export interface SaveUserAgreements {
    agreements: Partial<UserAgreements>;
    currentUserVersion?: bigint;
}


export interface KongSwapAmountsParams {
    sourceToken: Token;
    destinationToken: Token;
    sourceAmount: bigint;
}

export interface KongSwapParams {
    destinationToken: Token;
    maxSlippage: number;
    sendAmount: bigint;
    referredBy?: string;
    receiveAmount: bigint;
    receiveAddress?: Address;
    sourceToken: Token;
    payTransactionId?: TxId;
}

export interface ICPSwapGetPoolParams {
    token0: {
        address: string;
        standard: string;
    };
    token1: {
        address: string;
        standard: string;
    };
    fee: bigint;
}

export interface ICPSwapQuoteSwapParams {
    amountIn: string;
    zeroForOne: boolean;
    amountOutMinimum: string;
}

export interface ICPSwapDepositWithdrawParams {
    token: string;
    amount: bigint;
    fee: bigint;
}

export interface ICPSwapGetUserUnusedBalanceParams {
    principal: Principal;
}

export interface ICPSwapQuoteParams {
    identity: Identity;
    sourceToken: IcToken;
    destinationToken: IcToken;
    sourceAmount: bigint;
    fee?: bigint;
}

export interface ICPSwapAmountReply {
    receiveAmount: bigint;
}


export interface CreateContactParams {
    identity: Identity;
    name: string;
}

export interface CreateContactParams {
    identity: Identity;
    name: string;
}

export interface UpdateContactParams {
    identity: Identity;
    contact: Contact;
}
