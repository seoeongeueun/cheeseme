import { useEffect, useState } from 'react'

function WidgetSettingsLeft(props){
    const [todo, setTodo] = useState(props.todo);
    const [calendar, setCalendar] = useState(props.calendar);
    const [notes, setNotes] = useState(props.notes);
    const [stickersOn, setStickersOn] = useState(props.stickersOn);
    
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

    const handleStickerClick = (index) => {
        let tmp = [...stickersOn];
        if (tmp[index]){
            tmp[index] = false;
        }
        else{
            tmp[index] = true;
        }
        setStickersOn( tmp );
        props.setStickersOn( tmp );
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
                {stickersOn?.length > 0 && props.stickersOn.map((value, index) => 
                    <div className="checkboxButton">
                        <input type="checkbox" name="checkTodo" checked={stickersOn[index]} onClick={() => handleStickerClick(index)}/>
                        <label>Sticker {index + 1}</label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WidgetSettingsLeft;