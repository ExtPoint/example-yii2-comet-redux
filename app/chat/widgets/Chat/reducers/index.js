import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import fileup from 'fileup-redux/lib/reducers/fileup';

import comet from './comet';

export default combineReducers({
    comet,
    form,
    fileup,
});