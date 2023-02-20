import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Right from '../components/Right.js';

function RightContainer() {

    const { date } = useSelector(state => ({
        date: state.datePick.date,
    }));

    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));

    return (
        <Right date={date} userId={userId}/>
    )
}

export default RightContainer;