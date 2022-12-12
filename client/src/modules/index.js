import { combineReducers } from 'redux';
import todos from './todos';
import editMode from './editMode';

const rootReducer = combineReducers({
    todos,
    editMode
    //add more reducers
});

export default rootReducer;