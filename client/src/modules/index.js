import { combineReducers } from 'redux';
import goals from './goals';
import editMode from './editMode';
import notes from './notes';

const rootReducer = combineReducers({
    goals,
    editMode,
    notes
    //add more reducers
});

export default rootReducer;