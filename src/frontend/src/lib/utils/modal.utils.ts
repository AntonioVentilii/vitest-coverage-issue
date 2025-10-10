const symbols: Record<string, symbol> = {};

export const getSymbol = (identifier: string) =>
    symbols[identifier] ?? (symbols[identifier] = Symbol(identifier));
