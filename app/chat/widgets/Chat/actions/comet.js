export const COLLECTION_UPDATE = 'COLLECTION_UPDATE';

export const update = (profileId, bindingId, items) => ({
    type: COLLECTION_UPDATE,
    profileId,
    bindingId,
    items,
});