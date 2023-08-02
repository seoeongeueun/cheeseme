import React from 'react';
import { useSelector } from 'react-redux';
import AddFriend from '../modals/AddFriend.js';

function AddFriendContainer(props) {
  const { name } = useSelector((state) => ({
    name: state.nameInfo.name,
  }));
  const friends = useSelector((state) => state.friendsList);
  const notis = useSelector((state) => state.notisList);
  return (
    <AddFriend
      name={name}
      setAddFriend={props.setAddFriend}
      friend={friends}
      notis={notis}
    />
  );
}

export default AddFriendContainer;
