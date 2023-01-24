import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';

function CalendarWidget(props){
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log("clicked date: ", date.getTime())
    }, [date])

    return (
        <div className="calendarWidget">
            {props.move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <Calendar onChange={setDate} value={date}/>
        </div>
    )

}

export default CalendarWidget;