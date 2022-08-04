import { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

function Todo(){
    const [count, setCount] = useState(1);
    const [goals, setGoals] = useState(['cse323', 'eat']);

    useEffect(() => {

    }, [goals, count])

    const handleAddTodo = () => {
        goals.push('')
        setCount(count+1)
    }

    const handleEditTodo = (key, value) => {
        goals[key] = value;
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          setCount(count+1)
        }
    }

    return (
        <div className="todoWidget">
            <div className="todoHeader">
                <p>To Do</p>
                <button onClick={handleAddTodo}><AddRoundedIcon sx={{size: '20px'}}/></button>
            </div>
            <div className="todoList">
                {goals.map((value, key) => (<div className="checkboxButton">
                    <input type="checkbox" name={key}/>
                    {value==='' ? <input onChange={(e) => handleEditTodo(key, e.target.value)} onKeyPress={handleKeyPress}/> : <label>{value}</label>}
                </div>))}
            </div>
        </div>
    )

}

export default Todo;