// Source: https://stackoverflow.com/a/66605669/5404186
export type Only<T, U> = {
	[P in keyof T]: T[P];
} & {
	[P in keyof U]?: never;
};


