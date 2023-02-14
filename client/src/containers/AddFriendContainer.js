import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddFriend from '../modals/AddFriend.js';

function AddFriendContainer(props) {
    const { name } = useSelector(state => ({
        name: state.nameInfo.name,
    }));

    return <AddFriend name={name} setAddFriend={props.setAddFriend}/>;
}

export default AddFriendContainer;
