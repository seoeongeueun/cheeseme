import { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import Draggable from 'react-draggable';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function Reminder({move, onCreate, onToggle, onEdit, onDelete, userId}){
    const [editMode, setEditMode] = useState(false);
    const [reminders, setReminders] = useState([{title: '컵 정리하기', detail: '컵 할리스 컵', check: false, color: 'rgba(206, 151, 251, 0.3)'},
    {title: '컴퓨터 끄기', detail: '꼭 끄세요', check: false, color: 'rgba(250, 169, 157, 0.3)'},
    {title: '다이아몬드', detail: '컵 할리스 컵', check: false, color: 'rgba(253, 223, 126, 0.3)'},
    {title: '컵 정리하기', detail: '컵 할리스 컵', check: false, color: 'rgba(155, 251, 225, 0.3)'},
    {title: '컵 정리하기', detail: '컵 할리스 컵', check: false, color: 'rgba(155, 251, 225, 0.3)'}]);
    const [show, setShow] = useState(false);
    //rgba(250, 169, 157, 0.4) rgba(253, 223, 126, 0.4) rgba(155, 251, 225, 0.4) rgba(103, 235, 250, 0.4)
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

    const updateReminders = async() => {
        let res = await FetchAPIPost('/api/reminder/update/' + userId, {
            reminders: reminders
        })
    }

    useEffect(() => {
        if (reminders) {
            updateReminders()
        }
    }, [reminders])

    const handleTitleClick = () => {
        let contentDiv = document.getElementById("reminderContent");
        if (show) {
            contentDiv.scrollTop = 0;
        }
        setShow(!show);
    };

    const handleSave = () => {
        setEditMode(false);
    }

    const handleAdd = () => {
        setEditMode(true);
        onCreate('', '');
        setReminders([...reminders, {title: '', text: '', check: false}])
    }

    const handleEditReminder = (_id, title) => {
        onEdit(_id, title, '');
    }

    return (
        <div className='reminderWidget'>
            {move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <div className='reminderHeader'>
                <span style={{marginLeft: '0.5rem', marginBottom: '0.1rem'}}>Reminder</span>
                <div className='reminderHeaderButtons'>
                    {!editMode && <button onClick={() => handleAdd()}><AddRoundedIcon sx={{fontSize: "1.5rem"}}/></button>}
                    {editMode ? <button onClick={() => handleSave()}><CheckRoundedIcon sx={{fontSize: "1.5rem", color: 'red'}}/></button> 
                    : <button onClick={() => setEditMode(true)}><RemoveRoundedIcon sx={{fontSize: "1.5rem"}}/></button>}
                </div>
            </div>
            <div className='reminderContent' id='reminderContent' style={{overflowY: show ? 'scroll' : 'hidden'}}>
                {reminders?.length > 0 && reminders.map((r) => (
                    <div className='reminderItem'>
                        <div className='reminderTitle'>
                            <button style={{backgroundColor: r.color}}>
                                {r.title === '' ? <input className='reminderInput' onChange={(e) => handleEditReminder(r._id, e.target.value)}/>
                                : <label style={{textDecoration: r.done ? 'line-through' : 'none'}}>{r.title}</label>}
                            </button>
                            <button onClick={() => handleTitleClick()} style={{width: '10%', backgroundColor: r.color}}>{show ? <ArrowDropUpIcon sc={{fontSize: '1.7rem'}}/> : <ArrowDropDownIcon sx={{fontSize: '1.7rem'}}/>}</button>
                        </div>
                        {show && <div className='reminderDetail' style={{backgroundColor: ''}} onClick={() => handleTitleClick()}><span style={{fontSize: '1.9rem', marginLeft: '0.7rem'}}>{r.detail}</span></div>}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Reminder;