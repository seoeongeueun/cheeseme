import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todo from '../widgets/Todo';
import { addGoal, toggleGoal } from '../modules/todos';

function TodosContainer() {
    const goals = useSelector(state = state.goals);
    const dispatch = useDispatch();

    const onCreate = text = dispatch(addGoal(text));
    const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch]);

    // return <Todo goals={goals} onCreate={onCreate} onToggle={onToggle} />;
    return;
}

export default TodosContainer;