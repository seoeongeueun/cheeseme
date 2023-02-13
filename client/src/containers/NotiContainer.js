import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from '../modals/Notification.js';
import { currentNotis, addNoti, toggleNoti } from '../modules/notisList.js';

function NotiContainer() {
    const notis = useSelector(state => state.notisList);
    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));
    const { name } = useSelector(state => ({
        name: state.nameInfo.name,
    }));
    const dispatch = useDispatch();
    const onChangeNotis = notis => dispatch(currentNotis(notis));
    const onAddNoti = noti => dispatch(addNoti(noti));
    const onToggleNoti = id => dispatch(toggleNoti(id));

    return <Notification name={name} notis={notis} userId={userId} onChangeNotis={onChangeNotis} onAddNoti={onAddNoti} onToggleNoti={onToggleNoti}/>;
}

export default NotiContainer;
