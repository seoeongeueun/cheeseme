import { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import SadColor from '../icons/sad.png';
import HappyColor from '../icons/happy.png';
import SadPlain from '../icons/sad (1).png';
import HappyPlain from '../icons/happy (1).png';
import Draggable from 'react-draggable';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';


function Todo(props){
    const [count, setCount] = useState(1);
    const [goals, setGoals] = useState([{id: 'cse323', check: false}, {id: 'eat', check: false}]);
    const [editMode, setEditMode] = useState(false);
    const [happy, setHappy] = useState(false);

    useEffect(() => {
        let c = 0;
        goals.forEach(g => {
            if (g.check){
                c += 1
            }
        });

        if (c === goals.length) {
            setHappy(true)
        }
    }, [count])

    useEffect(() => {
        
    }, [goals, count, editMode, happy, props.move])

    const handleAddTodo = () => {
        goals.push({id: '', check: false})
        setHappy(false)
        setCount(count+1)
    }

    const handleEditTodo = (key, value) => {
        goals[key].id = value;
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          setCount(count+1)
        }
    }

    const handleCheck = (key, value) => {
        goals[key].check = value;
        setCount(count+1)
        if (value === false) {
            setHappy(false);
        }
    }

    return (
        <div className="todoWidget">
            {props.move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <div className="todoHeader">
                <span>To Do</span>
                <div className="todoHeaderButtons">
                    <button onClick={handleAddTodo}><AddRoundedIcon sx={{size: '20px'}}/></button>
                    <button onClick={() => setEditMode(!editMode)}><RemoveRoundedIcon sx={editMode ? {size: '20px', color: "#F9D876"} : {size: '20px'}}/></button>
                </div>
            </div>
            <div className="todoList">
                {!editMode ? goals.map((value, key) => (<div className="checkboxButton">
                    <input type="checkbox" name={key} onChange={(e) => handleCheck(key, e.target.checked)} defaultChecked={value.check}/>
                    {value.id==='' ? <input onChange={(e) => handleEditTodo(key, e.target.value)} onKeyPress={handleKeyPress}/> : <label>{value.id}</label>}
                </div>)) : goals.map((value, key) => (<div className='checkboxButton'>
                    <input type="checkbox" name={key} onChange={(e) => handleCheck(key, e.target.checked)} defaultChecked={value.check}/>
                    <input className='todoElem' placeholder={value.id} onChange={(e) => handleEditTodo(key, e.target.value)}/>
                </div>))}
            </div>
            <div className='faceMoodTodo'>
                <img src={happy ? HappyColor : HappyPlain} alt="happy" style={happy ? {width: '2.1rem', height: '2.1rem'} : null}/>
                <img src={!happy ? SadColor : SadPlain} alt="sad" style={!happy ? {width: '2.1rem', height: '2.1rem'} : null}/>
            </div>
        </div>
    )

}

export default Todo;