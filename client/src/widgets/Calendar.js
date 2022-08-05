import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';

function CalendarWidget(props){
    return (
        <div className="calendarWidget">
            {props.move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <Calendar />
        </div>
    )

}

export default CalendarWidget;