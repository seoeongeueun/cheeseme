import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notes from '../widgets/Notes';
import { editNote, createNote } from '../modules/notes';

function NotesContainer(props) {
  const { text } = useSelector((state) => ({
    text: state.notes.text,
  }));

  const { userId } = useSelector((state) => ({
    userId: state.loginInfo.userId,
  }));

  const dispatch = useDispatch();

  const onEdit = (text) => dispatch(editNote(text));
  const onCreate = (date) => dispatch(createNote(date));

  return (
    <Notes
      userId={userId}
      move={props.move}
      onEdit={onEdit}
      note={text}
      onCreate={onCreate}
      date={props.date}
    />
  );
}

export default NotesContainer;
