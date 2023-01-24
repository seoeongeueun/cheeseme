import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLeft } from '../modules/editMode';
import Left from '../components/Left.js';

function EditModeLeftContainer() {
    const { editMode } = useSelector(state => ({
        editMode: state.editMode.leftEdit
    }));

    const { date } = useSelector(state => ({
        date: state.datePick.date,
    }));

    const dispatch = useDispatch();
    const onToggleLeft = () => dispatch(toggleLeft());

    return (
        <Left editMode={editMode} setEditMode={onToggleLeft} date={date}/>
    )
}

export default EditModeLeftContainer;