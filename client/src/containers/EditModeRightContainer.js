import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleRight } from '../modules/editMode';

function EditModeRightContainer() {
    const { editMode } = useSelector(state => ({
        editMode: state.editMode.rightEdit
    }));

    const dispatch = useDispatch();
    const onToggleRight = () => dispatch(toggleRight());
}

export default EditModeRightContainer;