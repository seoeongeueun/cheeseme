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
import viewFriend from './viewFriend';
import stickers from './stickers';

const rootReducer = combineReducers({
  goals,
  editMode,
  notes,
  datePick,
  loginInfo,
  friendsList,
  notisList,
  nameInfo,
  positionsList,
  viewFriend,
  stickers,
});

export default rootReducer;
