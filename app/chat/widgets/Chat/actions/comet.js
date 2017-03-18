export const COLLECTION_UPDATE = 'COLLECTION_UPDATE';

export const update = (listId, items) => ({
    type: COLLECTION_UPDATE,
    listId,
    items,
});