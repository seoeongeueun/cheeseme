import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notes from '../widgets/Notes';
import { editNote, createNote } from '../modules/notes';

function NotesContainer(props) {
    const {date, text} = useSelector(state => ({
        date: state.notes.date,
        text: state.notes.text
    }));
    const dispatch = useDispatch();

    const onEdit = text => dispatch(editNote(text));
    const onCreate = date => dispatch(createNote(date));

    return <Notes move={props.move} onEdit={onEdit} note={text} onCreate={onCreate} dateOnly={props.dateOnly}/>;
}

export default NotesContainer;
