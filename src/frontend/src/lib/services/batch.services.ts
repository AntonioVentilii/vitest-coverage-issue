export const createBatches = <T>({items, batchSize}: { items: T[]; batchSize: number }): T[][] =>
    Array.from({length: Math.ceil(items.length / batchSize)}, (_, index) =>
        items.slice(index * batchSize, (index + 1) * batchSize)
    );
