import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

function DdayCounter() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    return (
        <div className="ddayWidget">
            <p>D-Day</p>
            <p>{start}</p>
            <div className="endDate">
                <p>End</p>
                <DatePicker onChange={setEnd} value={end} />
            </div>
        </div>
    );
}

export default DdayCounter;