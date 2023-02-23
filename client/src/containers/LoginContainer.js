import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../modals/Login.js';
import { currentUser } from '../modules/loginInfo.js';
import { currentName } from '../modules/nameInfo.js';
import { setFriendId } from '../modules/viewFriend.js';

function LoginContainer(props) {
    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));

    const dispatch = useDispatch();
    const onCurrentUserChange = id => dispatch(currentUser(id));
    const onCurrentNameChange = name => dispatch(currentName(name));
    const onSetFriendId = friendId => dispatch(setFriendId(friendId));
    return <Login onSetFriendId={onSetFriendId} onCurrentNameChange={onCurrentNameChange} onCurrentUserChange={onCurrentUserChange} userId={userId}/>;
}

export default LoginContainer;
