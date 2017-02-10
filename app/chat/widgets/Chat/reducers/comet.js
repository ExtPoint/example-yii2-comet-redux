import {COLLECTION_UPDATE} from '../actions/comet';

const initialState = {
};

export default function content(state = initialState, action) {
    switch (action.type) {
        case COLLECTION_UPDATE:
            return {
                ...state,
                [action.profileId]: {
                    ...(state[action.profileId] || {}),
                    [action.bindingId]: [].concat(action.items),
                },
            };

        default:
            return state;
    }
}

export const getCollection = (state, profileId, bindingId) => state.comet[profileId] && state.comet[profileId][bindingId] || [];