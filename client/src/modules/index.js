import { combineReducers } from 'redux';
import goals from './goals';
import editMode from './editMode';
import notes from './notes';
import datePick from './datePick';
import loginInfo from './loginInfo';
import friendsList from './friendsList';

const rootReducer = combineReducers({
    goals,
    editMode,
    notes,
    datePick,
    loginInfo,
    friendsList
    //add more reducers
});

export default rootReducer;