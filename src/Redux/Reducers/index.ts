import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import QuestionsReducer from './QuestionsReducer';

export default combineReducers({
    AuthReducer,
    QuestionsReducer,
})