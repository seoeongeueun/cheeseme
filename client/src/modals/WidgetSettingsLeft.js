import { useEffect, useState } from 'react'

function WidgetSettingsLeft(props){
    const [todo, setTodo] = useState(props.todo);
    const [calendar, setCalendar] = useState(props.calendar);
    const [notes, setNotes] = useState(props.notes);
    const [stickersOn, setStickersOn] = useState(props.stickersOn);

    useEffect = (() => {

    }, [stickersOn])

    
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
        stickersOn[index] = !stickersOn[index];
        let tmp = [...stickersOn];
        tmp[index] = !tmp[index];
        setStickersOn({ tmp });
        props.setStickersOn({ tmp });
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
                {stickersOn.foreach((value, index) => {
                    <div className="checkboxButton">
                        <input type="checkbox" name="checkTodo" checked={stickersOn[index]} onClick={() => handleStickerClick(index)}/>
                        <label>Sticker {index}</label>
                    </div>
                })}
            </div>
        </div>
    );
}

export default WidgetSettingsLeft;