import { useEffect, useState } from 'react';
import { FetchAPIPost, FetchApiDelete} from '../utils/api.js';
import axios from 'axios';

function WidgetSettingsLeft(props){
    const [todo, setTodo] = useState(props.todo);
    const [calendar, setCalendar] = useState(props.calendar);
    const [notes, setNotes] = useState(props.notes);
    const [ddayCounter, setDdayCounter] = useState(props.ddayCounter);
    const [reminder, setReminder] = useState(props.reminder);
    const [clock, setClock] = useState(props.clock);
    const [positions, setPositions] = useState([]);
    const instance = axios.create({
        baseURL: process.env.NODE_ENV !== 'production' ? 'https://localhost:8080/' : "https://cheese-me.fly.dev/",
      });

    useEffect(() => {
        if (props.userId) {
            instance.get('/api/users/find/' + props.userId, {
                withCredentials: true
            })
            .then((res) => {
              const n = res?.data;
              if (n) {
                setPositions(n.positions);
                props.onChangePositions(n.positions);
              }
            })
            .catch( (err) => {
                console.log('Error loading positions: ', props.userId)
            })
        }
    }, [props.userId]);

    const update = async() => {
        let res = await FetchAPIPost('/api/users/update/' + props.userId, {
            positions: positions
        });
    }

    useEffect(() => {
        if (positions?.length > 0 && props.userId) {
            update();
        }
    }, [positions])

    const handleTodoClick = async(value) => {
        if (value) {
            setTodo(true);
            props.setTodo(true);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'todo') {
                        return {...p, show: true};
                    }
                    return p;
                })
                setPositions(newState);
            }
        } else {
            setTodo(false);
            props.setTodo(false);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'todo') {
                        return {...p, show: false};
                    }
                    return p;
                })
                setPositions(newState);
            }
        }
    }

    const handleCalendarClick = async(value) => {
        if (value) {
            setCalendar(true);
            props.setCalendar(true);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'cal') {
                        return {...p, show: true};
                    }
                    return p;
                })
                setPositions(newState);
            }
        } else {
            setCalendar(false);
            props.setCalendar(false);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'cal') {
                        return {...p, show: false};
                    }
                    return p;
                })
                setPositions(newState);
            }
        }
    }

    const handleNotesClick = async(value) => {
        if (value) {
            setNotes(true);
            props.setNotes(true);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'note') {
                        return {...p, show: true};
                    }
                    return p;
                })
                setPositions(newState);
            }
        } else {
            setNotes(false);
            props.setNotes(false);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'note') {
                        return {...p, show: false};
                    }
                    return p;
                })
                setPositions(newState);
            }
        }
        
    }

    const handleDdayCounterClick = async(value) => {
        if (value) {
            setDdayCounter(true);
            props.setDdayCounter(true);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'dday') {
                        return {...p, show: true};
                    }
                    return p;
                })
                setPositions(newState);
            }
        } else {
            setDdayCounter(false);
            props.setDdayCounter(false);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'dday') {
                        return {...p, show: false};
                    }
                    return p;
                })
                setPositions(newState);
            }
        }
    }

    const handleReminderClick = async(value) => {
        if (value) {
            setReminder(true);
            props.setReminder(true);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'reminder') {
                        return {...p, show: true};
                    }
                    return p;
                })
                setPositions(newState);
            }
        } else {
            setReminder(false);
            props.setReminder(false);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'reminder') {
                        return {...p, show: false};
                    }
                    return p;
                })
                setPositions(newState);
            }
        }
    }

        const handleClockClick = async(value) => {
        if (value) {
            setClock(true);
            props.setClock(true);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'clock') {
                        return {...p, show: true};
                    }
                    return p;
                })
                setPositions(newState);
            }
        } else {
            setClock(false);
            props.setClock(false);
            if (positions) {
                const newState = positions.map(p => {
                    if (p.name === 'clock') {
                        return {...p, show: false};
                    }
                    return p;
                })
                setPositions(newState);
            }
        }
    }

    return(
        <div className="settingsbox">
            <span className='settingsboxTitle'>Widget Settings</span>
            <div className="checkboxlist">
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.notes} onChange={(e) => handleNotesClick(e.target.checked)}/>
                    <label>Notes</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.todo} onChange={(e) => handleTodoClick(e.target.checked)}/>
                    <label>To Do List</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.calendar} onChange={(e) => handleCalendarClick(e.target.checked)}/>
                    <label>Calendar</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.ddayCounter} onChange={(e) => handleDdayCounterClick(e.target.checked)}/>
                    <label>D-Day Counter</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.reminder} onChange={(e) => handleReminderClick(e.target.checked)}/>
                    <label>Reminder</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkTodo" checked={props.clock} onChange={(e) => handleClockClick(e.target.checked)}/>
                    <label>World Clock</label>
                </div>
            </div>
        </div>
    );
}

export default WidgetSettingsLeft;