import { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Draggable from 'react-draggable';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function Reminder({move, onCreate, onToggle, onDelete, userId}){
    const [editMode, setEditMode] = useState(false);
    const [reminders, setReminders] = useState([{title: '컵 정리하기', detail: '할리스 컵', check: false, color: 'red'}]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get('/api/reminder/' + userId)
            .then((res) => {
                if (res?.data){
                    setReminders(res?.data.reminders);
                }
            })
            .catch((err) => {
                console.log('Error loading reminders')
            })
    }, []);

    const handleTitleClick = () => {
        setShow(true);
    };

    return (
        <div className='reminderWidget'>
            <div className='reminderHeader'>
                <span>Reminder</span>
                <div className='reminderHeaderButtons'>
                    <button>+</button>
                    <button>-</button>
                </div>
            </div>
            <div className='reminderContent'>
                {reminders?.length > 0 && reminders.map((r) => (
                    <div className='reminderItem'>
                        <button onClick={() => handleTitleClick()}><span style={{textDecoration: r.done ? 'line-through' : 'none'}}>{r.title}</span></button>
                        {show && <span>{r.detail}</span>}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Reminder;