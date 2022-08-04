import { useEffect, useState } from 'react'

function WidgetSettingsLeft(props){
    const [todo, setTodo] = useState(props.todo);
    const [calendar, setCalendar] = useState(props.calendar);
    const [notes, setNotes] = useState(props.notes);

    
    const handleTodoClick = () => {
        setTodo(!todo)
        props.setTodo(!todo)
    }

    const handleCalendarClick = () => {
        setCalendar(!calendar)
        props.setCalendar(!calendar)
    }

    const handleNotesClick = () => {
        setNotes(!notes);
        props.setNotes(!notes);
    }

    return(
        <div className="settingsbox">
            <div class="checkboxlist">
                <p1>Widget Settings</p1>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.notes} onClick={() => handleNotesClick()}/>
                    <label>Notes</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.todo} onClick={() => handleTodoClick()}/>
                    <label>To Do List</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.calendar} onClick={() => handleCalendarClick()}/>
                    <label>Calendar</label>
                </div>
            </div>
        </div>
    );
}

export default WidgetSettingsLeft;