import { useEffect, useState } from 'react';
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
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet } from '../utils/api.js';

function Todo({ move, onCreate, onToggle, onDelete, date, userId }) {
  const [count, setCount] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [happy, setHappy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allTodos, setAllTodos] = useState([
    {
      date: new Date().setHours(0, 0, 0, 0),
      goals: [
        { id: 1, text: 'order new sim card', check: false },
        { id: 2, text: 'do laundry', check: true },
      ],
    },
  ]);
  const [_id, setId] = useState('');
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080/'
        : 'https://cheese-me.fly.dev/',
  });
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (userId) {
      instance
        .get('/api/todos/getByOwner/' + userId, {
          withCredentials: true,
        })
        .then((res) => {
          setLoading(true);
          const n = res?.data;
          if (n) {
            setAllTodos(n);
          } else {
            setAllTodos([]);
          }
          return;
        })
        .catch((err) => {
          console.log('Error loading todos');
        });
    } else {
      setAllTodos([
        {
          date: new Date().setHours(0, 0, 0, 0),
          goals: [
            { id: 1, text: 'order new sim card', check: false },
            { id: 2, text: 'do laundry', check: true },
          ],
        },
      ]);
    }
  }, [userId]);

  useEffect(() => {
    if (_id === '' && userId) {
      instance
        .get('/api/todos/getByOwner/' + userId, {
          withCredentials: true,
        })
        .then((res) => {
          setLoading(true);
          const n = res?.data;
          if (n) {
            setAllTodos(n);
          } else {
            setAllTodos([]);
          }
          return;
        })
        .catch((err) => {
          console.log('Error loading todos');
        });
    }
  }, [loading]);

  useEffect(() => {
    if (allTodos?.length > 0 && date) {
      const todo = allTodos.find((t) => t.date === date);
      if (todo) {
        setGoals(todo?.goals);
        setHappy(todo?.smile);
        setId(todo?._id);
        setLoading(false);
      } else {
        setGoals([]);
        setHappy(false);
        setId('');
        setLoading(true);
      }
    } else {
      setId('');
      setGoals([]);
      setHappy(false);
      setLoading(true);
    }
  }, [allTodos]);

  useEffect(() => {
    if (allTodos?.length > 0 && date) {
      const todo = allTodos.find((t) => t.date === date);
      if (todo) {
        setGoals(todo?.goals);
        setHappy(todo?.smile);
        setId(todo?._id);
        setLoading(false);
      } else {
        setGoals([]);
        setHappy(false);
        setId('');
        setLoading(true);
      }
    } else {
      setId('');
      setLoading(true);
    }
  }, [date]);

  const handleAddTodo = () => {
    onCreate('');
    setHappy(false);
    setCount(count + 1);
    setEditMode(true);
    let max = 1;
    goals.map((g) => (max < g.id ? (max = g.id) : null));
    setGoals([...goals, { id: max + 1, text: '', check: false }]);
  };

  const handleEditTodo = async (key, value) => {
    //goals[key].text = value;
    const newState = goals.map((obj) => {
      if (obj.id === key) {
        return { ...obj, text: value };
      }
      return obj;
    });
    setGoals(newState);
  };

  const handleEditMode = async () => {
    if (editMode && userId) {
      if (allTodos?.length === 0 || _id === '') {
        let res = await FetchAPIPost('/api/todos/add', {
          owner: userId,
          date: date,
          goals: goals,
          smile: happy,
        });
        setLoading(false);
      } else {
        let res = await FetchAPIPost('/api/todos/updateById/' + _id, {
          date: date,
          goals: goals,
          smile: happy,
        });
      }
    }
    setEditMode(!editMode);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setCount(count + 1);
    }
  };

  const handleCheck = async (key, value) => {
    //goals[key].check = value;
    setCount(count + 1);
    if (value === false) {
      setHappy(false);
      const newState = goals.map((obj) => {
        if (obj.id === key) return { ...obj, check: false };
        return obj;
      });
      let res = await FetchAPIPost('/api/todos/updateById/' + _id, {
        date: date,
        goals: newState,
        smile: false,
      });
      setGoals(newState);
    } else {
      let c = 0;
      const newState = goals.map((obj) => {
        if (obj.check === false) c++;
        if (obj.id === key) {
          if (!obj.check) c--;
          return { ...obj, check: true };
        }
        return obj;
      });
      let checkSmile = false;
      if (c <= 0) {
        setHappy(true);
        checkSmile = true;
      }
      let res = await FetchAPIPost('/api/todos/updateById/' + _id, {
        date: date,
        goals: newState,
        smile: checkSmile,
      });
      setGoals(newState);
    }
  };

  const handleDelete = async (id) => {
    onDelete(id);
    const newState = goals.filter((e) => e.id !== id);
    setGoals(newState);
    if (newState.length === 0) {
      let res = await FetchApiDelete('/api/todos/deleteById/' + _id, {});
      if (res) {
        setEditMode(false);
        setGoals([]);
        setId('');
        setLoading(true);
        setHappy(false);
        console.log('Todo deleted');
      }
    }
  };

  return (
    <div className="todoWidget">
      <div className="reminderDeco" />
      {move && (
        <strong>
          <OpenWithSharpIcon sx={{ fontSize: '7rem' }} />
        </strong>
      )}
      <div className="todoHeader">
        <span style={{ marginLeft: '0.3rem' }}>To Do</span>
        <div className="todoHeaderButtons">
          <button onClick={handleAddTodo}>
            <AddRoundedIcon sx={{ size: '20px' }} />
          </button>
          <button onClick={handleEditMode}>
            {editMode && goals.length > 0 ? (
              <CheckRoundedIcon sx={{ size: '20px', color: '#f73939' }} />
            ) : (
              <RemoveRoundedIcon sx={{ size: '20px' }} />
            )}
          </button>
        </div>
      </div>
      <div className="todoList">
        {!editMode
          ? goals.map((value, key) => (
              <div className="checkboxButton" key={key}>
                {value.check ? (
                  <CheckBoxRoundedIcon
                    className="checkbox"
                    sx={{ fontSize: '1.5rem' }}
                    onClick={() => handleCheck(value.id, false)}
                  />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon
                    className="checkbox"
                    sx={{ fontSize: '1.5rem' }}
                    onClick={() => handleCheck(value.id, true)}
                  />
                )}
                {value.text === '' ? (
                  <input
                    onChange={(e) => handleEditTodo(value.id, e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                ) : (
                  <label>{value.text}</label>
                )}
              </div>
            ))
          : goals.map((value, key) => (
              <div className="checkboxButton">
                {value.check ? (
                  <CheckBoxRoundedIcon
                    className="checkbox"
                    sx={{ fontSize: '1.5rem' }}
                    onClick={() => handleCheck(value.id, false)}
                  />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon
                    className="checkbox"
                    sx={{ fontSize: '1.5rem' }}
                    onClick={() => handleCheck(value.id, true)}
                  />
                )}
                <input
                  className="todoElem"
                  placeholder={value.text}
                  onChange={(e) => handleEditTodo(value.id, e.target.value)}
                />
                <button onClick={() => handleDelete(value.id)}>
                  <ClearRoundedIcon
                    sx={
                      editMode
                        ? { size: '20px', color: '#f73939' }
                        : { size: '20px' }
                    }
                  />
                </button>
              </div>
            ))}
      </div>
      <div className="faceMoodTodo">
        <img
          src={happy ? HappyColor : HappyPlain}
          alt="happy"
          style={happy ? { width: '2.1rem', height: '2.1rem' } : null}
        />
        <img
          src={!happy ? SadColor : SadPlain}
          alt="sad"
          style={!happy ? { width: '2.1rem', height: '2.1rem' } : null}
        />
      </div>
    </div>
  );
}

export default Todo;
