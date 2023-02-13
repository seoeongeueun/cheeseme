import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Friend from '../modals/Friend.js';
import { currentFriends, addFriend, removeFriend, favFriend } from '../modules/friendsList.js';

function FriendContainer() {
    const friends = useSelector(state => state.friendsList);
    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));
    const dispatch = useDispatch();
    const onChangeFriends = friends => dispatch(currentFriends(friends));
    const onAddFriend = name => dispatch(addFriend(name));
    const onRemoveFriend = name => dispatch(removeFriend(name));
    const onFavFriend = name => dispatch(favFriend(name));

    return <Friend userId={userId} friends={friends} onChangeFriends={onChangeFriends} onAddFriend={onAddFriend} onRemoveFriend={onRemoveFriend} onFavFriend={onFavFriend}/>;
}

export default FriendContainer;
