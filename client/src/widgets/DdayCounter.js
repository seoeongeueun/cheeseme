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
    const [left, setLeft] = useState();
    const [title, setTitle] = useState();
    const [edit, setEdit] = useState(true);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState();

    //change it to today later

    useEffect(() => {
        let tmp = new Date().setHours(0, 0, 0, 0);
        setStart(tmp)
        setLoading(true);
        axios.get('/api/dday/' + tmp)
            .then( (res) => {
                const n = res?.data;
                if (n) {
                    setDate(n.date)
                    setEnd(n.end)
                    setTitle(n.text)
                    setLoading(false);
                }
                else{
                    setDate(tmp)
                }
                return;
            })
            .catch( (err) => {
                console.log('Error loading note')
            })
    }, []);

    useEffect(() => {
        let c = 0
        if (end) c = end - start;
        let daysLeft = Math.round(c / (1000 * 60 * 60 * 24));
        if (daysLeft < 0) setLeft(0)
        else setLeft(daysLeft)
    }, [start, end]);

    useEffect(() => {
        const change = async () => {
            let res = await FetchAPIPost('/api/dday/update/' + date, {
                text: title,
                end: end
            });
        }
        const addNew = async () => {
            let res = await FetchAPIPost('/api/dday/add/', {
                date: new Date().setHours(0, 0, 0, 0),
                start: new Date().setHours(0, 0, 0, 0),
                text: title,
                end: end
            });
        }
        if (loading) {
            addNew();
            setLoading(false)
        }
        else {
            change();
            setLoading(false)
        }
        setLoading(false);
    }, [edit, end])



    const handleKeyPress = async(event) => {
        if(event.key === 'Enter'){
            setEdit(false);
            if (date) {
                let res = await FetchAPIPost('/api/dday/update/' + date, {
                    text: title
                });
            }
        }
    }

    return (
        <div className="ddayWidget">
            <div className='datesLeft'>
                <div className='ddayHeader'>
                    <span style={{color: '#F9D876', '-webkit-text-stroke': '1px solid black'}}>D-{left}</span>
                    <span style={{fontSize: "2.2rem"}}> 🧀</span>
                </div>
                {edit ? <button onClick={() => setEdit(!edit)}><ExpandLessRoundedIcon sx={{fontSize: '30px', color: '#F9D876'}}/></button> : <button onClick={() => setEdit(!edit)}><ExpandMoreRoundedIcon sx={{fontSize: '30px', color: '#F9D876'}}/></button>}
            </div>
            <div className='ddayfooter'>
                <div className='displayTitle'>
                    {title ? <span>{title}</span> : <span style={{color: "#929292"}}>name your d-day!</span>}
                </div>
                <div className='displayDate'>
                    {end ? <span style={{color: "#929292"}}>{new Date(end).getMonth()+1}/{new Date(end).getDate()}/{new Date(end).getFullYear()}</span>
                    : <span style={{color: "#929292"}}>{new Date().getMonth()+1}/{new Date().getDate()}/{new Date().getFullYear()}</span>}
                </div>
            </div>
            {edit && <div className='ddayCollapse'>
            <div className="endDate">
                <span>End</span>
                <DatePicker onChange={(e) => setEnd(e.getTime())} value={end ? new Date(end) : new Date()}/>
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