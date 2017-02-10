import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import comet from './comet';

export default combineReducers({
    comet,
    form,
});