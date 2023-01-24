import { combineReducers } from 'redux';
import goals from './goals';
import editMode from './editMode';
import notes from './notes';
import datePick from './datePick';

const rootReducer = combineReducers({
    goals,
    editMode,
    notes,
    datePick
    //add more reducers
});

export default rootReducer;