import type {tool} from '$declarations/llm/llm.did';
import {toNullable} from '@dfinity/utils';

export const AI_ASSISTANT_LLM_MODEL = 'qwen3:32b';


export const getAiAssistantToolsDescription = ({
                                                   enabledNetworksSymbols,
                                                   enabledTokensSymbols
                                               }: {
    enabledNetworksSymbols: string[];
    enabledTokensSymbols: string[];
}) =>
    [
        {
            function: {
                name: 'show_all_contacts',
                description: toNullable(
                    "Show all contacts when no filters are provided (e.g. 'Show me all contacts'). Do not include commentary or extra text."
                ),
                parameters: toNullable()
            }
        },
        {
            function: {
                name: 'show_filtered_contacts',
                description: toNullable(
                    'Filter the provided contacts list by semantic meaning and return only matching addressIds. If no matches, do not call any tools and tell to user that not suitable contacts were found with the given filters.'
                ),
                parameters: toNullable({
                    type: 'object',
                    properties: toNullable([
                        {
                            type: 'array',
                            name: 'addressIds',
                            description: toNullable('Array of matching address IDs.'),
                            enum: toNullable()
                        }
                    ]),
                    required: toNullable(['addressIds'])
                })
            }
        },
        {
            function: {
                name: 'review_send_tokens',
                description: toNullable(
                    `Display a pending token transfer for confirmation. Always return 4 arguments: "amountNumber" (string), "tokenSymbol" (string), "networkId" (string), and either "selectedContactAddressId" (string) or "address" (string). If one of those arguments is not available, ask the user to provide it.`
                ),
                parameters: toNullable({
                    type: 'object',
                    properties: toNullable([
                        {
                            type: 'string',
                            name: 'selectedContactAddressId',
                            enum: toNullable(),
                            description: toNullable(
                                `Unique ID of the specific blockchain address from a contact (addresses[].id). Must match one of the token's "matchingAddressTypes".`
                            )
                        },
                        {
                            type: 'string',
                            name: 'address',
                            enum: toNullable(),
                            description: toNullable(
                                'Blockchain address to send tokens to if not using a contact.'
                            )
                        },
                        {
                            type: 'string',
                            name: 'amountNumber',
                            enum: toNullable(),
                            description: toNullable(
                                'Numeric amount to send. Example: "10" for 10 ICP, "0.5" for 0.5 BTC.'
                            )
                        },
                        {
                            type: 'string',
                            name: 'tokenSymbol',
                            enum: toNullable(enabledTokensSymbols),
                            description: toNullable(
                                "Token symbol or identifier to send. Example: 'ICP', 'BTC', 'ckUSDC'. Must be one of the AVAILABLE TOKENS."
                            )
                        },
                        {
                            type: 'string',
                            name: 'networkId',
                            enum: toNullable(enabledNetworksSymbols),
                            description: toNullable(
                                'The blockchain network where the token will be sent (e.g., ETH, BASE, ARB, ICP, SOL, BTC). Must come from AVAILABLE TOKENS.'
                            )
                        }
                    ]),
                    required: toNullable(['amountNumber', 'tokenSymbol', 'networkId'])
                })
            }
        },
        {
            function: {
                name: 'show_balance',
                description: toNullable(
                    `Show user's wallet balance with a possibility to filter by token, network or both at the same time.`
                ),
                parameters: toNullable({
                    type: 'object',
                    properties: toNullable([
                        {
                            type: 'string',
                            name: 'tokenSymbol',
                            enum: toNullable(enabledTokensSymbols),
                            description: toNullable(
                                "Token symbol or identifier for which the balance should be shown. Example: 'ICP', 'BTC', 'ckUSDC'. Must be one of the AVAILABLE TOKENS."
                            )
                        },
                        {
                            type: 'string',
                            name: 'networkId',
                            enum: toNullable(enabledNetworksSymbols),
                            description: toNullable(
                                'The blockchain network for which the balance should be shown (e.g., ETH, BASE, ARB, ICP, SOL, BTC). Optional argument, no need to ask user to provide it specifically. Must come from AVAILABLE TOKENS.'
                            )
                        }
                    ]),
                    required: toNullable()
                })
            }
        }
    ] as tool[];
