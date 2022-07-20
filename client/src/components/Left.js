import { useEffect, useState } from 'react'
import GridLines from 'react-gridlines';
import DisplaySettingsLeft from '../modals/DisplaySettingsLeft';
import WidgetSettingsLeft from '../modals/WidgetSettingsLeft';
import Todo from '../widgets/Todo';
import CalendarWidget from '../widgets/Calendar';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';


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
                        <button onClick={()=> setShowWidgetSettings(!showWidgetSettings)}><DashboardCustomizeOutlinedIcon sx={{fontSize: "3rem"}}/></button>
                        {showWidgetSettings && <WidgetSettingsLeft todo={todo} setTodo={setTodo} calendar={calendar} setCalendar={setCalendar}/>}
                        <button onClick={()=> setShowSettings(!showSettings)}><SettingsOutlinedIcon sx={{fontSize: "3rem"}}/></button>
                        {showSettings && <DisplaySettingsLeft grid={grid} setGrid={setGrid}/>}
                    </div>
                </div>}
        </div>
    );
}

export default Left;