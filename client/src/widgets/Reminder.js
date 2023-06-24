import { useEffect, useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Draggable from 'react-draggable';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function Reminder({move, onCreate, onToggle, onEdit, onDelete, userId}){
    const [editMode, setEditMode] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [show, setShow] = useState(false);
    const [reminders, setReminders] = useState([]);
    const [colorCode, setColorCode] = useState(['rgba(103, 235, 250, 0.3)', 'rgba(250, 169, 157, 0.3)', 'rgba(253, 223, 126, 0.3)', 'rgba(206, 151, 251, 0.3)'])
    const [colorCodeLight, setColorCodeLight] = useState(['rgba(103, 235, 250, 0.1)', 'rgba(250, 169, 157, 0.1)', 'rgba(253, 223, 126, 0.1)', 'rgba(206, 151, 251, 0.1)'])
    //rgba(250, 169, 157, 0.4) rgba(253, 223, 126, 0.4) rgba(155, 251, 225, 0.4) rgba(103, 235, 250, 0.4)
    const instance = axios.create({
        baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/' : "https://cheese-me.fly.dev/",
      });
    useEffect(() => {
        if (userId) {
            instance.get('/api/reminder/' + userId, {
                withCredentials: true
            })
            .then((res) => {
                if (res?.data){
                    setReminders(res?.data.reminders);
                } else {
                    setNotFound(true);
                    setReminders([])
                }
            })
            .catch((err) => {
                console.log('Error loading reminders')
            })
        } else {
            setReminders([{title: 'This is guest mode', detail: 'You can test things out as guest but your changes will not be saved!', check: false, _id: 0}, {title: 'debit card expiration date 06/23', detail: 'card renewal required', check: true, _id: 1}])
        }
    }, [userId]);

    useEffect(() => {
        if (editMode) {
            setShow(true)
        }
    }, [editMode])

    const updateReminders = async() => {
        let res = await FetchAPIPost('/api/reminder/update/' + userId, {
            reminders: reminders
        })
    }

    const createReminders = async() => {
        let res = await FetchAPIPost('/api/reminder/add', {
            owner: userId,
            reminders: reminders
        })
    }

    const handleTitleClick = () => {
        let contentDiv = document.getElementById("reminderContent");
        if (show) {
            contentDiv.scrollTop = 0;
        }
        setShow(!show);
    };

    const handleSave = () => {
        setEditMode(false);
        setShow(false)
        if (notFound) {
            createReminders();
            setNotFound(false);
        } else {
            updateReminders()
        }
    }

    const handleAdd = () => {
        setEditMode(true);
        onCreate('', '');
        if (userId) {
            setReminders([...reminders, {title: '', detail: '', check: false}])
        } else {
            setReminders([...reminders, {title: '', detail: '', check: false, _id: reminders.length}])
        }

    }

    const handleEditReminder = (i, title) => {
        //onEdit(_id, title, '');
        const newState = reminders.map(r => {
            if (reminders.indexOf(r) === i){
                return {...r, title: title}
            }
            return r;
        });
        setReminders(newState);
    }

    const handleEditDetail = (i, title, detail) => {
        //onEdit(_id, title, detail);
        const newState = reminders.map(r => {
            if (reminders.indexOf(r) === i) {
                return {...r, detail: detail}
            }
            return r;
        });
        setReminders(newState);
    }

    const handleCheckTitle = async(_id) => {
        onToggle(_id);
        const newState = reminders.map(r => {
            if (r._id === _id) return {...r, check: !r.check};
            return r;
        });
        setReminders(newState);
        let res = await FetchAPIPost('/api/reminder/update/' + userId, {
            reminders: newState
        })
    }

    const handleCheckTitleGuest = async(i) => {
        const newState = reminders.map(r => {
            if (r._id === i) return {...r, check: !r.check};
            return r;
        });
        setReminders(newState);
    }

    const handleDelete = (i) => {
        setReminders(reminders.filter( e => reminders.indexOf(e) !== i));
    }

    return (
        <div className='reminderWidget'>
            {move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <div className='reminderHeader'>
                <span style={{marginLeft: '0.5rem', marginBottom: '0.1rem'}}>Reminder</span>
                <div className='reminderHeaderButtons'>
                    {!editMode && <button onClick={() => handleAdd()}><AddRoundedIcon sx={{fontSize: "1.5rem"}}/></button>}
                    {editMode ? <button onClick={() => handleSave()}><CheckRoundedIcon sx={{fontSize: "1.5rem", color: '#f73939'}}/></button> 
                    : <button onClick={() => setEditMode(true)}><RemoveRoundedIcon sx={{fontSize: "1.5rem"}}/></button>}
                </div>
            </div>
            <div className='reminderContent' id='reminderContent' style={{overflowY: show ? 'scroll' : 'hidden', maxHeight: show ? '17rem' : ''}}>
                {reminders?.length > 0 && reminders.map((r, i) => (
                    <div className='reminderItem' key={r._id}>
                        <div className='reminderTitle'>
                            <button style={{backgroundColor: colorCode[i%colorCode.length]}}>
                                {editMode ? 
                                <><input className='reminderInput' value={r.title} onChange={(e) => handleEditReminder(i, e.target.value)}/><ClearRoundedIcon onClick={() => handleDelete(i)} sx={{fontSize: '1.2rem', color: '#f73939'}}/></>
                                : <label style={{textDecorationLine: r.check ? 'line-through' : 'none', cursor: 'pointer', textDecorationThickness: '1px'}} onClick={() => userId ? handleCheckTitle(r._id) : handleCheckTitleGuest(i)}>{r.title}</label>}
                            </button>
                            <button onClick={() => handleTitleClick()} style={{width: '10%', backgroundColor: colorCode[i%colorCode.length]}}>{show ? <ArrowDropUpIcon sx={{fontSize: '1.5rem'}}/> : <ArrowDropDownIcon sx={{fontSize: '1.7rem'}}/>}</button>
                        </div>
                        {(show && !editMode) && <div className='reminderDetail' onClick={() => setShow(false)} style={{backgroundColor: colorCodeLight[i%colorCodeLight.length]}}><p style={{fontSize: '1.9rem', whiteSpace: 'pre-wrap'}}>{r.detail}</p></div>}
                        {(show && editMode) && <div className='reminderDetail' style={{backgroundColor: colorCodeLight[i%colorCodeLight.length]}}><textarea style={{marginLeft: '0.6rem', fontSize: '1.7rem'}} value={r.detail} onChange={(e) => handleEditDetail(i, r.title, e.target.value)}/></div>}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Reminder;