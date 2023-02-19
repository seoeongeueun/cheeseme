import { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Draggable from 'react-draggable';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function Reminder({move, onCreate, onToggle, onDelete, userId}){
    const [editMode, setEditMode] = useState(false);
    const [reminders, setReminders] = useState([{title: '컵 정리하기', detail: '컵 할리스 컵', check: false, color: 'rgba(206, 151, 251, 0.4)'},
    {title: '컴퓨터 끄기', detail: '꼭 끄세요', check: false, color: 'rgba(250, 169, 157, 0.4)'},
    {title: '다이아몬드', detail: '컵 할리스 컵', check: false, color: 'rgba(253, 223, 126, 0.4)'},
    {title: '컵 정리하기', detail: '컵 할리스 컵', check: false, color: 'rgba(155, 251, 225, 0.4)'}]);
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

    const handleTitleClick = () => {
        setShow(!show);
    };

    return (
        <div className='reminderWidget'>
            {move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <div className='reminderHeader'>
                <span style={{marginLeft: '0.3rem'}}>Reminder</span>
                <div className='reminderHeaderButtons'>
                    <button>+</button>
                    <button>-</button>
                </div>
            </div>
            <div className='reminderContent' style={{overflowY: show ? 'scroll' : 'hidden'}}>
                {reminders?.length > 0 && reminders.map((r) => (
                    <div className='reminderItem'>
                        <div className='reminderTitle'>
                            <button style={{backgroundColor: r.color}}><span style={{textDecoration: r.done ? 'line-through' : 'none'}}>{r.title}</span></button>
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