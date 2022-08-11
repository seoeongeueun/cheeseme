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
        let start = new Date();
        setLeft(Math.round(Math.abs(end-start) / (1000 * 60 * 60 * 24)));
    }, [start, end])

    useEffect(() => {

    }, [edit, title])

    return (
        <div className="ddayWidget" style={ !edit ? {width: '20rem'} : {}}>
            <div className='datesLeft'>
                <div className='ddayHeader'>
                    <span style={{color: '#F9D876'}}>D - {left}</span>
                    <span style={{fontSize: "2rem"}}> 🧀</span>
                </div>
                {edit ? <button onClick={() => setEdit(!edit)}><ExpandLessRoundedIcon sx={{fontSize: '30px', color: '#F9D876'}}/></button> : <button onClick={() => setEdit(!edit)}><ExpandMoreRoundedIcon sx={{fontSize: '30px', color: '#F9D876'}}/></button>}
            </div>
            {title ? <span>{title}</span> : <span>title of your d-day!</span>}
            {edit && <div>
            <div className="endDate">
                <p>End</p>
                <DatePicker onChange={setEnd} value={end} />
            </div>
            <div className='ddayTitle'>
                <p>Title</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title of your d-day!"/>
            </div>
            </div>}
            {props.move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
        </div>
    );
}

export default DdayCounter;