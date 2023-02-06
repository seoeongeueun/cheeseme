import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Right from '../components/Right.js';

function RightContainer() {

    const { date } = useSelector(state => ({
        date: state.datePick.date,
    }));

    return (
        <Right date={date}/>
    )
}

export default RightContainer;