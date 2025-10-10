import type {TxId} from '$declarations/kong_backend/kong_backend.did';
import type {SchnorrKeyId} from '$declarations/signer/signer.did';
import type {Address} from '$lib/types/address';
import type {Token} from '$lib/types/token';


export interface GetSchnorrPublicKeyParams {
    derivationPath: string[];
    keyId: SchnorrKeyId;
}

export interface SignWithSchnorrParams extends GetSchnorrPublicKeyParams {
    message: number[];
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
