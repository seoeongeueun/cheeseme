import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Friend from '../modals/Friend.js';
import { currentFriends, addFriend, removeFriend, favFriend } from '../modules/friendsList.js';
import { setFriendId } from '../modules/viewFriend.js';
function FriendContainer() {
    const friends = useSelector(state => state.friendsList);
    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));
    const { friendId } = useSelector(state => ({
        friendId: state.viewFriend.friendId,
    }));
    const dispatch = useDispatch();
    const onChangeFriends = friends => dispatch(currentFriends(friends));
    const onAddFriend = name => dispatch(addFriend(name));
    const onRemoveFriend = name => dispatch(removeFriend(name));
    const onFavFriend = name => dispatch(favFriend(name));

    const onSetFriendId = friendId => dispatch(setFriendId(friendId));

    return <Friend userId={userId} onSetFriendId={onSetFriendId} friends={friends} onChangeFriends={onChangeFriends} onAddFriend={onAddFriend} onRemoveFriend={onRemoveFriend} onFavFriend={onFavFriend}/>;
}

export default FriendContainer;
