import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Right from '../components/Right.js';
import { setFriendId } from '../modules/viewFriend.js';

function RightContainer() {

    const { date } = useSelector(state => ({
        date: state.datePick.date,
    }));

    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));

    const { friendId } = useSelector(state => ({
        friendId: state.viewFriend.friendId,
    }));

    const dispatch = useDispatch();
    const onSetFriendId = friendId => dispatch(setFriendId(friendId));

    return (
        <Right date={date} userId={userId} friendId={friendId} onSetFriendId={onSetFriendId}/>
    )
}

export default RightContainer;