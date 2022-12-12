import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notes from '../widgets/Notes';
import { editNote } from '../modules/notes';

function NotesContainer(props) {
    const {id, text} = useSelector(state => ({
        id: state.notes.id,
        text: state.notes.text
    }));
    const dispatch = useDispatch();

    const onEdit = text => dispatch(editNote(text));

    return <Notes move={props.move} onEdit={onEdit} note={text}/>;
}

export default NotesContainer;
