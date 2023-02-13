import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../modals/Login.js';
import { currentUser } from '../modules/loginInfo.js';

function LoginContainer(props) {
    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));

    const dispatch = useDispatch();
    const onCurrentUserChange = id => dispatch(currentUser(id));

    return <Login onCurrentUserChange={onCurrentUserChange} userId={userId}/>;
}

export default LoginContainer;
