import {SwapProvider, type SwapProvidersConfig} from '$lib/types/swap';

export const SWAP_SLIPPAGE_PRESET_VALUES = [0.5, 1.5, 3];
export const [_, SWAP_DEFAULT_SLIPPAGE_VALUE] = SWAP_SLIPPAGE_PRESET_VALUES;


export const KONG_SWAP_PROVIDER = 'kongSwap';
export const ICP_SWAP_PROVIDER = 'icpSwap';
export const VELORA_SWAP_PROVIDER = 'velora';


export const SWAP_ETH_TOKEN_PLACEHOLDER = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';


export const swapProvidersDetails: Record<string, SwapProvidersConfig> = {
    [SwapProvider.VELORA]: {
        website: 'https://app.velora.xyz/',
        name: 'Velora',
        logo: '/images/dapps/velora-logo.svg'
    }
};
