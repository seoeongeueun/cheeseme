import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';

function CalendarWidget({move, onChangeDate, date}){
    const [datePicked, setDatePicked] = useState(new Date().setHours(0, 0, 0, 0));


    useEffect(() => {
        setDatePicked(date)
    }, [date]);

    const handleChange = (d) => {
        onChangeDate(d.getTime());
        setDatePicked(d.getTime());
    }

    return (
        <div className="calendarWidget">
            {move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <Calendar onChange={(d) => handleChange(d)} value={new Date(datePicked)}/>
        </div>
    )

}

export default CalendarWidget;