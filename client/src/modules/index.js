import { combineReducers } from 'redux';
import goals from './goals';
import editMode from './editMode';
import notes from './notes';
import datePick from './datePick';
import loginInfo from './loginInfo';
import friendsList from './friendsList';
import notisList from './notisList';
import nameInfo from './nameInfo';
import positionsList from './positionsList';

const rootReducer = combineReducers({
    goals,
    editMode,
    notes,
    datePick,
    loginInfo,
    friendsList,
    notisList,
    nameInfo,
    positionsList
    //add more reducers
});

export default rootReducer;