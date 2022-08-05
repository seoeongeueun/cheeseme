import { useEffect, useState, useRef } from 'react'
import GridLines from 'react-gridlines';
import DisplaySettingsLeft from '../modals/DisplaySettingsLeft';
import WidgetSettingsLeft from '../modals/WidgetSettingsLeft';
import Todo from '../widgets/Todo';
import Notes from '../widgets/Notes';
import CalendarWidget from '../widgets/Calendar';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import Draggable from 'react-draggable';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';


function Left(){
    const [showSettings, setShowSettings] = useState(false);
    const [showWidgetSettings, setShowWidgetSettings] = useState(false);

    const [grid, setGrid] = useState(false);

    const [todo, setTodo] = useState(true);
    const [calendar, setCalendar] = useState(true);
    const [notes, setNotes] = useState(true);
    const [top, setTop] = useState(0);
    const [width, setWidth] = useState(0);
    const [left, setLeft] = useState(0);
    const [height, setHeight] = useState(0);

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const bodyRef = document.getElementById("leftContent");
        if (bodyRef){
            setHeight(bodyRef.offsetHeight)
            setWidth(bodyRef.offsetWidth)
        }
    }, []);

    useEffect(() => {
        
    }, [editMode])

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
                        <button onClick={() => setEditMode(!editMode)}><OpenWithRoundedIcon sx={{fontSize: '20px'}}/></button>
                    </div>
                </div>
            </GridLines> :
            <div className="leftContent" id="leftContent">
                    <div className="leftBody">
                        {calendar && <Draggable><div><CalendarWidget/></div></Draggable>}
                        {todo && <Draggable bounds={{top: 0, left: 0, right: width-320, bottom: height-240}} handle="strong"><div><Todo move={editMode}/></div></Draggable>} 
                        {notes && <Draggable><div><Notes/></div></Draggable>}
                    </div>
                    <div className="leftFooter">
                        <div className="leftWidget">
                            <button onClick={() => setEditMode(!editMode)}><OpenWithRoundedIcon sx={ editMode ? {fontSize: '2.3rem', color: '#F9D876'} : {fontSize: '2.3rem'}}/></button>
                        </div>
                        <div className="leftWidget">
                            <button onClick={()=> setShowWidgetSettings(!showWidgetSettings)}>{showWidgetSettings ? <DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                            {showWidgetSettings && <WidgetSettingsLeft todo={todo} setTodo={setTodo} calendar={calendar} setCalendar={setCalendar} notes={notes} setNotes={setNotes}/>}
                        </div>
                        <div className="leftWidget">
                            <button onClick={()=> setShowSettings(!showSettings)}>{showSettings ? <SettingsOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                            {showSettings && <DisplaySettingsLeft grid={grid} setGrid={setGrid}/>}
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default Left;