import { useEffect, useState } from 'react'
import GridLines from 'react-gridlines';
import DisplaySettingsLeft from '../modals/DisplaySettingsLeft';
import WidgetSettingsLeft from '../modals/WidgetSettingsLeft';
import Todo from '../widgets/Todo';
import CalendarWidget from '../widgets/Calendar';


function Left(){
    const [showSettings, setShowSettings] = useState(false);
    const [showWidgetSettings, setShowWidgetSettings] = useState(false);

    const [grid, setGrid] = useState(false);

    const [todo, setTodo] = useState(true);
    const [calendar, setCalendar] = useState(true);

    useEffect(() => {

    });

    return(
        <div className="leftInnerBorder">
            {grid ? <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12}>
                <div className="leftContent">
                    <div className="leftBody">

                    </div>
                    <div className="leftFooter">
                        <button onClick={()=> setShowWidgetSettings(!showWidgetSettings)}>widgets</button>
                        {showWidgetSettings && <WidgetSettingsLeft todo={todo} setTodo={setTodo}/>}
                        <button onClick={()=> setShowSettings(!showSettings)}>settings</button>
                        {showSettings && <DisplaySettingsLeft grid={grid} setGrid={setGrid}/>}
                    </div>
                </div>
            </GridLines> :
            <div className="leftContent">
                    <div className="leftBody">
                        {todo && <Todo/>}
                        {calendar && <CalendarWidget/>}
                    </div>
                    <div className="leftFooter">
                        <button onClick={()=> setShowWidgetSettings(!showWidgetSettings)}>widgets</button>
                        {showWidgetSettings && <WidgetSettingsLeft todo={todo} setTodo={setTodo} calendar={calendar} setCalendar={setCalendar}/>}
                        <button onClick={()=> setShowSettings(!showSettings)}>settings</button>
                        {showSettings && <DisplaySettingsLeft grid={grid} setGrid={setGrid}/>}
                    </div>
                </div>}
        </div>
    );
}

export default Left;