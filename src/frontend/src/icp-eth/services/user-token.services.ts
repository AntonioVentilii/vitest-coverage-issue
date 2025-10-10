import type { UserToken } from '$declarations/backend/backend.did';
import type { SaveUserToken } from '$eth/services/erc20-user-tokens.services';
import type { Erc20Token } from '$eth/types/erc20';
import type { Erc20UserToken } from '$eth/types/erc20-user-token';
import type { IcCkToken } from '$icp/types/ic-token';
import { type AutoLoadTokenResult } from '$lib/services/token.services';
import { toNullable } from '@dfinity/utils';

const assertIcrcSendTokenData = (sendToken: IcCkToken): AutoLoadTokenResult | undefined => {
	if (sendToken.twinToken?.standard !== 'erc20') {
		return { result: 'skipped' };
	}
};

const findUserToken = ({
	tokens,
	sendToken
}: {
	tokens: Erc20UserToken[];
	sendToken: IcCkToken;
}): Erc20UserToken | undefined =>
	tokens.find(
		({ address }) =>
			address.toLowerCase() === (sendToken.twinToken as Erc20Token).address.toLowerCase()
	);

export const toUserToken = ({
	address: contract_address,
	network,
	decimals,
	symbol,
	version,
	enabled
}: SaveUserToken): UserToken => ({
	contract_address,
	chain_id: network.chainId,
	decimals: toNullable(decimals),
	symbol: toNullable(symbol),
	version: toNullable(version),
	enabled: toNullable(enabled)
});
