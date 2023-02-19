import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLeft } from '../modules/editMode';
import { currentPositions } from '../modules/positionsList';
import Left from '../components/Left.js';

function EditModeLeftContainer() {
    const { editMode } = useSelector(state => ({
        editMode: state.editMode.leftEdit
    }));

    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));

    const { date } = useSelector(state => ({
        date: state.datePick.date,
    }));

    const positions = useSelector(state => state.positionsList);

    const dispatch = useDispatch();
    const onToggleLeft = () => dispatch(toggleLeft());
    const onChangePositions = positions => dispatch(currentPositions(positions));

    return (
        <Left userId={userId} positions={positions} editMode={editMode} setEditMode={onToggleLeft} date={date} onChangePositions={onChangePositions}/>
    )
}

export default EditModeLeftContainer;