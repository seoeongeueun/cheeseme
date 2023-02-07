import axios from 'axios';
import { useEffect, useState } from 'react';

function SearchResultLeft(props){
    const [foundNotes, setFoundNotes] = useState();
    const [foundTodos, setFoundTodos] = useState();


    useEffect(() => {
        if (props.keyword) {
            axios.get('/api/notes/search/text/' + props.keyword)
            .then( (res) => {
                const n = res?.data;
                if (n) setFoundNotes(n);
                return;
            })
            .catch( (err) => {
                console.log('Error loading notes: ', err)
            });
            axios.get('/api/todos/search/goals/' + props.keyword)
            .then( (res) => {
                const n = res?.data;
                if (n) setFoundTodos(n);
                return;
            })
            .catch( (err) => {
                console.log('Error loading todos: ', err)
            })
        }
    }, [props.keyword])

    useEffect(() => {
    }, [foundNotes, foundTodos])

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

    return (
        <div className='leftInnerBorder'>
            <div className="leftContentSearch">
                <p>Search Results for <b>{props.keyword}</b></p>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>Notes </span>
                    </div>
                    {foundNotes?.length > 0 ? foundNotes.map((note) => (
                        <div className='foundSearchItem'>
                            <span>{new Date(note.date).getMonth()+1}.{new Date(note.date).getDate()}.{new Date(note.date).getFullYear()}</span>
                            <span>{cutString(note.text.toLowerCase(), props.keyword)}</span>
                        </div>
                    )) : <div className='foundSearchItem'><span>No Result</span></div>}
                </div>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>Todos </span>
                    </div>
                    {foundTodos?.length > 0 ? foundTodos.map((todo) => (
                        <div className='foundSearchItem'>
                            <span>{new Date(todo.date).getMonth()+1}.{new Date(todo.date).getDate()}.{new Date(todo.date).getFullYear()}</span>
                            {todo.goals.map((g) => (
                                <div className="foundTodos">
                                    <span>{g.text}</span>
                                </div>
                            ))}
                        </div>
                    )) : <div className='foundSearchItem'><span>No Result</span></div>}
                </div>
                
            </div>
        </div>
    )
}

export default SearchResultLeft;