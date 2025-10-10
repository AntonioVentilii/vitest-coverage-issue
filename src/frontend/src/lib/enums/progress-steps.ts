// A collection of enums used in Oisy's various wizards when the effective actions are being executed.
// For example, in an Ethereum transfer, when the message is first signed and then effectively sent.

export enum ProgressStepsSend {
    INITIALIZATION = 'initialization',

    SIGN_TRANSFER = 'sign_transfer',
    TRANSFER = 'transfer',

    DONE = 'done'
}


export enum ProgressStepsSwap {


    SWAP = 'swap',
    WITHDRAW = 'withdraw',
    UPDATE_UI = 'update_ui',

}


export enum ProgressStepsAddToken {
    INITIALIZATION = 'initialization',
    SAVE = 'save',
    UPDATE_UI = 'update_ui',
    DONE = 'done'
}


export enum ProgressStepsSendIc {


    SEND = 'send',

}


export enum AddressBookSteps {


    QR_CODE_SCAN = 'qr_code_scan',

    SAVE_ADDRESS = 'save_address',

}
