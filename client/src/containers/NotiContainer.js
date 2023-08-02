import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from '../modals/Notification.js';
import { currentNotis, addNoti, toggleNoti } from '../modules/notisList.js';
import { currentFriends, addFriend } from '../modules/friendsList.js';

function NotiContainer() {
  const notis = useSelector((state) => state.notisList);
  const friends = useSelector((state) => state.friendsList);
  const { userId } = useSelector((state) => ({
    userId: state.loginInfo.userId,
  }));
  const { name } = useSelector((state) => ({
    name: state.nameInfo.name,
  }));
  const dispatch = useDispatch();
  const onChangeNotis = (notis) => dispatch(currentNotis(notis));
  const onAddNoti = (noti) => dispatch(addNoti(noti));
  const onToggleNoti = (id) => dispatch(toggleNoti(id));

  const onChangeFriends = (friends) => dispatch(currentFriends(friends));
  const onAddFriend = (name) => dispatch(addFriend(name));

  return (
    <Notification
      name={name}
      notis={notis}
      userId={userId}
      friends={friends}
      onChangeNotis={onChangeNotis}
      onAddNoti={onAddNoti}
      onToggleNoti={onToggleNoti}
      onChangeFriends={onChangeFriends}
      onAddFriend={onAddFriend}
    />
  );
}

export default NotiContainer;
