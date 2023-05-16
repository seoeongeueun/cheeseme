import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function DdayCounter(props) {
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [left, setLeft] = useState(0);
    const [title, setTitle] = useState();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState();

    useEffect(() => {
        if (props.userId) {
            axios.get('/api/dday/getByOwner/' + props.userId)
                .then((res) => {
                    if (res?.data) {
                        setTitle(res?.data.text);
                        setEnd(res?.data.end);
                        setStart(res?.data.start);
                        setLoading(false)
                    }
                    else {
                        setEdit(true);
                    }
                })
        } else {
            setTitle('');
            setEnd(null);
            setStart(new Date().setHours(0, 0, 0, 0));
            setLeft(0)
        }
    }, [props.userId])

    useEffect(() => {
        if (end) {
            let c = 0
            if (!start) {
                c = end - new Date().setHours(0, 0, 0, 0);
            } else {
                c = end - start
            }
            let daysLeft = Math.round(c / (1000 * 60 * 60 * 24));
            if (daysLeft < 0) setLeft(0)
            else setLeft(daysLeft)
        }
    }, [end, start]);

    useEffect(() => {
        const change = async () => {
            let res = await FetchAPIPost('/api/dday/update/' + props.userId, {
                start: new Date().setHours(0, 0, 0, 0),
                text: title,
                end: end
            });
        }
        const addNew = async () => {
            let res = await FetchAPIPost('/api/dday/add/' + props.userId, {
                start: new Date().setHours(0, 0, 0, 0),
                text: title,
                end: end
            });
            setStart(new Date().setHours(0, 0, 0, 0));
        }
        if (start && props.userId) {
            change();
            setLoading(false);
        }
        else {
            if (props.userId) {
                addNew();
                setLoading(false);
            }
        }
        setLoading(false);
    }, [edit, end])



    const handleKeyPress = async(event) => {
        if(event.key === 'Enter'){
            setEdit(false);
            if (date) {
                let res = await FetchAPIPost('/api/dday/update/' + props.userId, {
                    text: title,
                });
            }
        }
    }

    return (
        <div className="ddayWidget" style={{width: edit && '23rem'}}>
            <div className='ddayProgressHeader'>
                <div className='ddayDeco'/>
                <div className='ddayDeco2'/>
                <div className="progressBarContainer">
                    <div className="progressBar" style={{width: `${100 - left}%`}}/>
                </div>
            </div>
            <div className='datesLeft'>
                <span style={{WebkitTextStroke: '1px solid black', fontWeight: 'bold', fontSize: '6rem'}}>{left}</span>
                {title ? <span style={{marginTop: '-0.8rem'}}>{title}</span> : <span style={{color: "#929292", marginTop: '-0.6rem'}}>name your d-day!</span>}
                {end ? <span style={{color: "#929292", fontSize: '1.5rem'}}>{new Date(end).getMonth()+1}/{new Date(end).getDate()}/{new Date(end).getFullYear()}</span>
                    : <span style={{color: "#929292", fontSize: '1.5rem'}}>{new Date().getMonth()+1}/{new Date().getDate()}/{new Date().getFullYear()}</span>}
                {edit ? <button onClick={() => {setEdit(!edit); props.setDdayEdit(false)}}><ExpandLessRoundedIcon sx={{fontSize: '18px', color: '#f73939', marginBottom: '-6px'}}/></button>
                    : <button onClick={() => {setEdit(!edit); props.setDdayEdit(true)}}><ExpandMoreRoundedIcon sx={{fontSize: '18px', color: '#f73939', marginBottom: '5px', marginTop: '0px'}}/></button>}
            </div>
            {edit && <div className='ddayCollapse'>
            <div className="endDate">
                <span>End</span>
                <DatePicker onCalendarOpen={() => props.setDdayEdit(true)} onCalendaarClose={() => props.setDdayEdit(false)} onChange={(e) => setEnd(e.getTime())} value={end ? new Date(end) : new Date()}/>
            </div>
            <div className='ddayTitle'>
                <span>Title</span>
                <input type="text" value={title ? title : ""} onChange={(e) => setTitle(e.target.value)} placeholder="name your d-day!" onKeyPress={handleKeyPress}/>
            </div>
            </div>}
            {props.move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
        </div>
    );
}

export default DdayCounter;