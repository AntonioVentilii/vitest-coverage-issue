export class EligibilityError extends Error {
}


export class NftError extends Error {
    constructor(
        private readonly _tokenUri: number,
        private readonly _contractAddress: string
    ) {
        super();
    }


    get contractAddress(): string {
        return this._contractAddress;
    }
}


export class AuthClientNotInitializedError extends Error {
}
