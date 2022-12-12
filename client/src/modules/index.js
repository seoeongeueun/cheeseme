import { combineReducers } from 'redux';
import goals from './goals';
import editMode from './editMode';

const rootReducer = combineReducers({
    goals,
    editMode
    //add more reducers
});

export default rootReducer;