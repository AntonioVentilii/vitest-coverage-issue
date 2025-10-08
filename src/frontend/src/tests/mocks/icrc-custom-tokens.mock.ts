import type { IcrcCustomToken } from '$icp/types/icrc-custom-token';
import { mockValidIcToken } from '$tests/mocks/ic-tokens.mock';

export const mockIcrcCustomToken: IcrcCustomToken = {
	enabled: false,
	...mockValidIcToken,
	alternativeName: 'test'
};

