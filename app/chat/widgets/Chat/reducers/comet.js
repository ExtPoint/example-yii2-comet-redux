import {COLLECTION_UPDATE} from '../actions/comet';

export default function content(state = {}, action) {
    switch (action.type) {
        case COLLECTION_UPDATE:
            return {
                ...state,
                [action.listId]: [].concat(action.items),
            };

        default:
            return state;
    }
}

export const getCollection = (state, listId) => state.comet[listId] || [];