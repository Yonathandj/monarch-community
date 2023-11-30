import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    publicImages: es.imageBucket().beforeDelete(() => {
        return true;
    }),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export { handler as GET, handler as POST };