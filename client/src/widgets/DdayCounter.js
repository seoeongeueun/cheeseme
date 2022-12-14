import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

function DdayCounter(props) {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [left, setLeft] = useState();
    const [title, setTitle] = useState();
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        let s = new Date();
        setLeft(Math.ceil(Math.abs(end-s) / (1000 * 60 * 60 * 24)));
        console.log(end)
    }, [start, end])

    useEffect(() => {

    }, [edit, title, left])

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          setEdit(false);
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
                    {title ? <span>{title}</span> : <span>title of your d-day!</span>}
                </div>
                <div className='displayDate'>
                    <span style={{color: "#929292"}}>{end.getMonth()+1}/{end.getDate()}/{end.getFullYear()}</span>
                </div>
            </div>
            {edit && <div>
            <div className="endDate">
                <p>End</p>
                <DatePicker onChange={setEnd} value={end} />
            </div>
            <div className='ddayTitle'>
                <p>Title</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title of your d-day!" onKeyPress={handleKeyPress}/>
            </div>
            </div>}
            {props.move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
        </div>
    );
}

export default DdayCounter;