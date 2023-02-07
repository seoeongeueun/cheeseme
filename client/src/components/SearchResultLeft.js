import axios from 'axios';
import { useEffect, useState } from 'react';
import Highlighter from "react-highlight-words";

function SearchResultLeft({onChangeDate, keyword, setSearch}){
    const [foundNotes, setFoundNotes] = useState();
    const [foundTodos, setFoundTodos] = useState();
    const [foundDdays, setFoundDdays] = useState();
    const [clicked, setClicked] = useState();



    useEffect(() => {
        if (keyword) {
            axios.get('/api/notes/search/text/' + keyword)
            .then( (res) => {
                const n = res?.data;
                if (n) setFoundNotes(n);
                return;
            })
            .catch( (err) => {
                console.log('Error loading notes: ', err)
            });
            axios.get('/api/todos/search/goals/' + keyword)
            .then( (res) => {
                const n = res?.data;
                if (n) setFoundTodos(n);
                return;
            })
            .catch( (err) => {
                console.log('Error loading todos: ', err)
            })
            axios.get('/api/dday/search/text/' + keyword)
            .then( (res) => {
                const n = res?.data;
                if (n) setFoundDdays(n);
                return;
            })
            .catch( (err) => {
                console.log('Error loading ddays: ', err)
            })
        }
    }, [keyword])

    useEffect(() => {
        console.log(foundDdays)
    }, [foundNotes, foundTodos, foundDdays])

    function removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, '');
    }

    function cutString(str, val) {
        var arr = removeTags(str)
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) !== -1){
            indexes.push(i);
        }
        
        let result = "";
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i] + val.length >= arr.length){
                if (indexes[i] - 10 <= 0) {
                    result.push(arr.substring(0, indexes[i] + val.length))
                } else {
                    result = result + ('...' + arr.substring(indexes[i] - 20, indexes[i] + val.length))
                }
            } else if (indexes[i] === 0){
                if (indexes[i] + val.length + 20 >= arr.length) {
                    result = result + (arr.substring(indexes[i], arr.length))
                } else {
                    result = result + (arr.substring(indexes[i], indexes[i] + val.length + 20) + '...')
                }
            }
            else {
                result = result + ('...' + arr.substring(indexes[i] - 10, indexes[i] + val.length + 10) + '...')
            }
            
        }
        return result
    }

    const handleClick = (date) => {
        console.log(date);
        setClicked(date);
        onChangeDate(date);
        setSearch(false)
    };

    return (
        <div className='leftInnerBorder'>
            <div className="leftContentSearch">
                <p style={{textAlign: "center"}}>Search Results for <b>{keyword}</b></p>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>Notes </span>
                    </div>
                    {foundNotes?.length > 0 ? foundNotes.map((note) => (
                        <div className='foundSearchItem' onClick={() => handleClick(note.date)}>
                            <span>{new Date(note.date).getMonth()+1}.{new Date(note.date).getDate()}.{new Date(note.date).getFullYear()}</span>
                            <Highlighter autoEscape={true} searchWords={[keyword]} textToHighlight={cutString(note.text.toLowerCase(), keyword)} />
                        </div>
                    )) : <div className='foundSearchItem'><span>No Result</span></div>}
                </div>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>Todos </span>
                    </div>
                    {foundTodos?.length > 0 ? foundTodos.map((todo) => (
                        <div className='foundSearchItem' onClick={() => handleClick(todo.date)}>
                            <span>{new Date(todo.date).getMonth()+1}.{new Date(todo.date).getDate()}.{new Date(todo.date).getFullYear()}</span>
                            {todo.goals.map((g) => (
                                <div className="foundTodos">
                                    <span>{g.text}</span>
                                </div>
                            ))}
                        </div>
                    )) : <div className='foundSearchItem'><span>No Result</span></div>}
                </div>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>D-Day </span>
                    </div>
                    {foundDdays?.length > 0 ? foundDdays.map((dday) => (
                        <div className='foundSearchItem' onClick={() => handleClick(dday.date)}>
                            <span>{new Date(dday.date).getMonth()+1}.{new Date(dday.date).getDate()}.{new Date(dday.date).getFullYear()}</span>
                            <span>{dday.text}</span>
                        </div>
                    )) : <div className='foundSearchItem'><span>No Result</span></div>}
                </div>
                
            </div>
        </div>
    )
}

export default SearchResultLeft;