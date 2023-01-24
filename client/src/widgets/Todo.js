import { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import SadColor from '../icons/sad.png';
import HappyColor from '../icons/happy.png';
import SadPlain from '../icons/sad (1).png';
import HappyPlain from '../icons/happy (1).png';
import Draggable from 'react-draggable';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function Todo({move, onCreate, onToggle, onDelete}){
    const [count, setCount] = useState(1);
    // const [goals, setGoals] = useState([{id: 'cse323', check: false}, {id: 'eat', check: false}]);
    const [editMode, setEditMode] = useState(false);
    const [happy, setHappy] = useState(false);
    const [loading, setLoading] = useState(true);

    //change it to dateonly later
    const [tmpDate, setTmpDate] = useState(0);
    //change to redux later
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        let today = new Date();
        let timePortion = today.getTime() % (3600 * 1000 * 24);
        let tmp = new Date(today - timePortion).getTime();
        setTmpDate(tmp);
        axios.get('/api/todos/' + tmp)
            .then( (res) => {
                setLoading(true);
                const n = res?.data;
                if (n) {
                    setGoals(n.goals);
                    setLoading(false);
                    setHappy(n.smile);
                }
                return;
            })
            .catch( (err) => {
                console.log('Error loading todos');
            })
    }, []);

    useEffect(() => {
        
    }, [count, editMode, move, tmpDate])


    const handleAddTodo = () => {
        onCreate('')
        setHappy(false)
        setCount(count+1)
        setEditMode(true);

        setGoals([...goals, {id: goals.length+1, text: '', check: false}])
    };

    const handleEditTodo = async(key, value) => {
        //goals[key].text = value;
        const newState = goals.map(obj => {
            if (obj.id === key+1)return {...obj, text: value};
            return obj;
        });
        setGoals(newState);
        
    };

    const handleEditMode = async() => {
        if (editMode) {
            if (loading){
                let res = await FetchAPIPost('/api/todos/add', {
                    date: tmpDate,
                    goals: goals,
                    smile: happy
                });
                setLoading(false);
            } else {
                let res = await FetchAPIPost('/api/todos/update/' + tmpDate, {
                    date: tmpDate,
                    goals: goals,
                    smile: happy
                });
            }
        }
        setEditMode(!editMode);
    }
      

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          setCount(count+1)
        }
    }

    const handleCheck = async(key, value) => {
        //goals[key].check = value;
        setCount(count+1)
        if (value === false) {
            setHappy(false);
            const newState = goals.map(obj => {
                if (obj.id === key+1) return {...obj, check: false};
                return obj;
            });
            let res = await FetchAPIPost('/api/todos/update/' + tmpDate, {
                date: tmpDate,
                goals: newState,
                smile: false,
            });
            setGoals(newState);
        }
        else {
            let c = 0;
            const newState = goals.map(obj => {
                if (obj.check === false) c++;
                if (obj.id === key+1) {
                    if (!obj.check) c --;
                    return {...obj, check: true};
                }
                return obj;
            });
            let checkSmile = false;
            if (c <= 0) {
                setHappy(true)
                checkSmile = true;
            }
            let res = await FetchAPIPost('/api/todos/update/' + tmpDate, {
                date: tmpDate,
                goals: newState,
                smile: checkSmile
            });
            setGoals(newState);
        }
    }

    return (
        <div className="todoWidget">
            {move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <div className="todoHeader">
                <span style={{marginLeft: '0.3rem'}}>To Do</span>
                <div className="todoHeaderButtons">
                    <button onClick={handleAddTodo}><AddRoundedIcon sx={{size: '20px'}}/></button>
                    <button onClick={handleEditMode}>{editMode && goals.length > 0 ? <CheckRoundedIcon sx={{size: '20px', color: "red"}}/> : <RemoveRoundedIcon sx={{size: '20px'}}/>}</button>
                </div>
            </div>
            <div className="todoList">
                {!editMode ? goals.map((value, key) => (<div className="checkboxButton">
                    <input type="checkbox" name={key} onChange={(e) => handleCheck(key, e.target.checked)} defaultChecked={value.check}/>
                    {value.text==='' ? <input onChange={(e) => handleEditTodo(key, e.target.value)} onKeyPress={handleKeyPress}/>
                    : <label>{value.text}</label>}
                </div>)) : goals.map((value, key) => (<div className='checkboxButton'>
                    <input type="checkbox" name={key} onChange={(e) => handleCheck(key, e.target.checked)} defaultChecked={value.check}/>
                    <input className='todoElem' placeholder={value.text} onChange={(e) => handleEditTodo(key, e.target.value)}/>
                    <button onClick={() => onDelete(value.id)}><ClearRoundedIcon sx={editMode ? {size: '20px', color: "red"} : {size: '20px'}}/></button>
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