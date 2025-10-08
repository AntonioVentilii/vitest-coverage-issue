import type { IcrcCustomToken } from '$icp/types/icrc-custom-token';
import { setCustomToken as setCustomTokenApi } from '$lib/api/backend.api';
import { toCustomToken } from '$lib/utils/custom-token.utils';
import type { Identity } from '@dfinity/agent';


export const setCustomToken = async ({
	token,
	identity,
	enabled
}: {
	identity: Identity;
	token: IcrcCustomToken;
	enabled: boolean;
}) =>
	await setCustomTokenApi({
		identity,
		token: toCustomToken({ ...token, enabled, networkKey: 'Icrc' })
	});
