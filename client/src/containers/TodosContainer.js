import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todo from '../widgets/Todo';
import { addGoal, toggleGoal, deleteGoal, editGoal } from '../modules/goals';

function TodosContainer(props) {
  const goals = useSelector((state) => state.goals);
  const { userId } = useSelector((state) => ({
    userId: state.loginInfo.userId,
  }));

  const dispatch = useDispatch();

  const onCreate = (text) => dispatch(addGoal(text));
  const onToggle = useCallback((id) => dispatch(toggleGoal(id)), [dispatch]);
  const onDelete = useCallback((id) => dispatch(deleteGoal(id)), [dispatch]);
  const onEdit = useCallback(
    (id, text) => dispatch(editGoal(id, text)),
    [dispatch],
  );

  return (
    <Todo
      userId={userId}
      move={props.move}
      date={props.date}
      goals={goals}
      onEdit={onEdit}
      onCreate={onCreate}
      onToggle={onToggle}
      onDelete={onDelete}
    />
  );
}

export default TodosContainer;
