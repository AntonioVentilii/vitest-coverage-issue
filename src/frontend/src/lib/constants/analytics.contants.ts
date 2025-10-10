// Authentication
export const TRACK_SYNC_AUTH_AUTHENTICATED_COUNT = 'sync_auth_authenticated';
export const TRACK_SYNC_AUTH_NOT_AUTHENTICATED_COUNT = 'sync_auth_not_authenticated';
export const TRACK_SYNC_AUTH_ERROR_COUNT = 'sync_auth_error';
export const TRACK_SIGN_OUT_SUCCESS = 'sign_out_success';
export const TRACK_SIGN_OUT_ERROR = 'sign_out_error';
export const TRACK_SIGN_OUT_WITH_WARNING = 'sign_out_with_warning';


// Ethereum
export const TRACK_COUNT_ETH_LOADING_BALANCE_ERROR = 'eth_loading_balance_error';
export const TRACK_COUNT_ETH_LOADING_TRANSACTIONS_ERROR = 'eth_loading_transactions_error';
export const TRACK_COUNT_ETH_PENDING_TRANSACTIONS_ERROR = 'eth_pending_transactions_error';
export const TRACK_ETH_ESTIMATE_GAS_ERROR = 'eth_estimate_gas_error';

// Internet Computer
export const TRACK_COUNT_IC_LOADING_TRANSACTIONS_ERROR = 'ic_loading_transactions_error';

export const TRACK_COUNT_IC_LOADING_ICRC_CANISTER_ERROR = 'ic_loading_icrc_canister_error';


// Manage Tokens
export const TRACK_COUNT_MANAGE_TOKENS_ENABLE_SUCCESS = 'manage_tokens_enable_success';
export const TRACK_COUNT_MANAGE_TOKENS_DISABLE_SUCCESS = 'manage_tokens_disable_success';
export const TRACK_COUNT_MANAGE_TOKENS_SAVE_ERROR = 'manage_tokens_save_error';


// I18n
export const TRACK_CHANGE_LANGUAGE = 'change_language';

// Currency
export const TRACK_CHANGE_CURRENCY = 'change_currency';


// Analytics event source routes
export const MANAGE_TOKENS_MODAL_ROUTE = 'manage-tokens-modal';

// Privacymode change
export const TRACK_PRIVACY_MODE_CHANGE = 'privacy_mode_change';

// Lock mode activated
export const TRACK_LOCK_MODE_ACTIVATED = 'lock_mode_activated';
export const TRACK_LOCK_MODE_DEACTIVATED = 'lock_mode_deactivated';

// Temporary events
// We have sudden spikes in the number of getLogs calls to Infura, which is causing issues.
// However, we are not sure when and how they happen.
// This event is used to track the number of calls to Infura's getLogs endpoint.
// TODO: Remove these events once the issue is resolved.
export const TRACK_INFURA_GET_LOGS_CALL = 'infura_get_logs_call';

// AI Assistant

export const AI_ASSISTANT_TOOL_EXECUTION_TRIGGERED = 'ai_assistant_tool_execution_triggered';
export const AI_ASSISTANT_TEXTUAL_RESPONSE_RECEIVED = 'ai_assistant_textual_response_received';
