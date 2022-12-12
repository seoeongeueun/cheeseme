import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todo from '../widgets/Todo';
import { addGoal, toggleGoal, deleteGoal } from '../modules/goals';

function TodosContainer(props) {
    const goals = useSelector(state => state.goals);
    const dispatch = useDispatch();

    const onCreate = text => dispatch(addGoal(text));
    const onToggle = useCallback(id => dispatch(toggleGoal(id)), [dispatch]);
    const onDelete = useCallback(id => dispatch(deleteGoal(id)), [dispatch])

    return <Todo move={props.move} goals={goals} onCreate={onCreate} onToggle={onToggle} onDelete={onDelete}/>;
}

export default TodosContainer;