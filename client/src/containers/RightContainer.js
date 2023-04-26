import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Right from '../components/Right.js';
import { setFriendId } from '../modules/viewFriend.js';
import { changeDate } from '../modules/datePick.js';

function RightContainer() {

    const { date } = useSelector(state => ({
        date: state.datePick.date,
    }));

    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));
    
    const { name } = useSelector(state => ({
        name: state.nameInfo.name,
    }));

    const { friendId } = useSelector(state => ({
        friendId: state.viewFriend.friendId,
    }));

    const dispatch = useDispatch();
    const onSetFriendId = friendId => dispatch(setFriendId(friendId));
    const onChangeDate = d => dispatch(changeDate(d));

    return (
        <Right date={date} name={name} userId={userId} friendId={friendId} onSetFriendId={onSetFriendId} onChangeDate={onChangeDate}/>
    )
}

export default RightContainer;