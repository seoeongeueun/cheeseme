import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Reminder from '../widgets/Reminder.js';
import { addReminder, toggleReminder, deleteReminder, editReminder } from '../modules/reminders';

function RemindersContainer(props) {
    const reminders = useSelector(state => state.reminders);
    const { userId } = useSelector(state => ({
        userId: state.loginInfo.userId,
    }));
    const dispatch = useDispatch();

    const onCreate = (title, detail) => dispatch(addReminder(title, detail));
    const onToggle = useCallback(_id => dispatch(toggleReminder(_id)), [dispatch]);
    const onDelete = useCallback(_id => dispatch(deleteReminder(_id)), [dispatch])
    const onEdit = useCallback((_id, title, detail) => dispatch(editReminder(_id, title, detail)), [dispatch])

    return <Reminder userId={userId} reminders={reminders} move={props.move} onEdit={onEdit} onCreate={onCreate} onToggle={onToggle} onDelete={onDelete}/>;
}

export default RemindersContainer;