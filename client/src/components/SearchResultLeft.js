import axios from 'axios';
import { useEffect, useState } from 'react';
import Highlighter from "react-highlight-words";
import GridLines from 'react-gridlines';

function SearchResultLeft({onChangeDate, keyword, setSearch, userId}){
    const [foundNotes, setFoundNotes] = useState();
    const [foundTodos, setFoundTodos] = useState();
    const [clicked, setClicked] = useState();
    const colorCode = ['rgba(253, 223, 126, 0.3)', 'rgba(103, 235, 250, 0.3)', 'rgba(250, 169, 157, 0.3)', 'rgba(155, 251, 225, 0.3)', 'rgba(206, 151, 251, 0.3)'];
    const instance = axios.create({
        baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/' : "https://cheese-me.fly.dev/",
      });

    useEffect(() => {
        if (keyword && userId) {
            instance.get('/api/notes/getByOwner/' + userId)
            .then( (res) => {
                const n = res?.data;
                if (n) setFoundNotes(res?.data.filter(n => n.text.toLowerCase().includes(keyword.toLowerCase())));
                return;
            })
            .catch( (err) => {
                console.log('Error loading notes: ', err)
            });
            instance.get('/api/todos/getByOwner/' + userId, {
                withCredentials: true
            })
            .then( (res) => {
                const n = res?.data;
                if (n) setFoundTodos(res?.data.filter(t => t.goals.find(g => g.text.toLowerCase().includes(keyword.toLowerCase()))));
                return;
            })
            .catch( (err) => {
                console.log('Error loading todos: ', err)
            })
        }
    }, [keyword, userId]);

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
        while ((i = arr.toLowerCase().indexOf(val, i+1)) !== -1){
            indexes.push(i);
        }
        
        if (indexes.length > 3 ) {
            let result = "";
            for (let i = 0; i < indexes.length; i++) {
                if (indexes[i] + val.length >= arr.length){
                    if (indexes[i] - 50 <= 0) {
                        result = result + (arr.substring(0, indexes[i] + val.length))
                    } else {
                        result = result + ('...' + arr.substring(indexes[i] - 50, indexes[i] + val.length))
                    }
                } else if (indexes[i] === 0){
                    if (indexes[i] + val.length + 50 >= arr.length) {
                        result = result + (arr.substring(indexes[i], arr.length))
                    } else {
                        result = result + (arr.substring(indexes[i], indexes[i] + val.length + 50) + '...')
                    }
                }
                else {
                    if (indexes[i] - 25 <= 0) {
                        if (indexes[i] + val.length + 50 >= arr.length) result = result + (arr.substring(0, indexes[i] + val.length + 50))
                        else result = result + (arr.substring(0, indexes[i] + val.length + 50) + '...')
                    } else {
                        if (indexes[i] + val.length + 15 >= arr.length) result = result + ('...' + arr.substring(indexes[i] - 35, indexes[i] + val.length + 15))
                        else result = result + ('...' + arr.substring(indexes[i] - 25, indexes[i] + val.length + 25) + '...')
                    }
                    
                }
            }
            return result
        } else {
            let result = "";
            for (let i = 0; i < indexes.length; i++) {
                if (indexes[i] + val.length >= arr.length){
                    if (indexes[i] - 80 <= 0) {
                        result = result + (arr.substring(0, indexes[i] + val.length))
                    } else {
                        result = result + ('...' + arr.substring(indexes[i] - 80, indexes[i] + val.length))
                    }
                } else if (indexes[i] === 0){
                    if (indexes[i] + val.length + 80 >= arr.length) {
                        result = result + (arr.substring(indexes[i], arr.length))
                    } else {
                        result = result + (arr.substring(indexes[i], indexes[i] + val.length + 80) + '...')
                    }
                }
                else {
                    if (indexes[i] - 40 <= 0) {
                        if (indexes[i] + val.length + 80 >= arr.length) result = result + (arr.substring(0, indexes[i] + val.length + 80))
                        else result = result + (arr.substring(0, indexes[i] + val.length + 80) + '...')
                    } else {
                        if (indexes[i] + val.length + 20 >= arr.length) result = result + ('...' + arr.substring(indexes[i] - 60, indexes[i] + val.length + 20))
                        else result = result + ('...' + arr.substring(indexes[i] - 40, indexes[i] + val.length + 40) + '...')
                    }
                    
                }
            }
            return result
        }
    }

    const handleClick = (date) => {
        console.log(date);
        setClicked(date);
        onChangeDate(date);
        setSearch(false)
    };

    return (
        <div className='leftInnerBorder'>
            <GridLines className="grid-area" cellWidth={60} strokeWidth={1} strokeWidth2={1} cellWidth2={12} lineColor2={"#e1e1e1"} lineColor={"#d4d4d4"}>
            <div className="leftContentSearch">
                <p style={{textAlign: "center"}}>Searching Widgets for <b>{keyword}</b></p>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>Notes </span>
                        <div className="line-yellow-short"/>
                    </div>
                    <div className='foundSearchItems'>
                        {foundNotes?.length > 0 ? foundNotes.map((note, index) => (
                            <div className='foundSearchItem' onClick={() => handleClick(note.date)}>
                                <span className='foundDate'>{new Date(note.date).getMonth()+1}.{new Date(note.date).getDate()}.{new Date(note.date).getFullYear()}</span>
                                <Highlighter highlightTag={"b"} searchWords={[keyword]} textToHighlight={cutString(note.text, keyword)} highlightStyle={{backgroundColor: colorCode[index%colorCode.length]}}/>
                            </div>
                        )) : <div className='foundSearchItemNotFound'><span>No Result</span></div>}
                    </div>
                </div>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>Todos </span>
                        <div className="line-yellow-short"/>
                    </div>
                    <div className='foundSearchItems'>
                        {foundTodos?.length > 0 ? foundTodos.map((todo, index) => (
                            <div className='foundSearchItem' onClick={() => handleClick(todo.date)}>
                                <span className='foundDate'>{new Date(todo.date).getMonth()+1}.{new Date(todo.date).getDate()}.{new Date(todo.date).getFullYear()}</span>
                                {todo.goals.map((g) => (
                                    <div className="foundTodos">
                                        <Highlighter highlightTag={"b"} searchWords={[keyword]} textToHighlight={g.text} highlightStyle={{backgroundColor: colorCode[index%colorCode.length]}}/>
                                    </div>
                                ))}
                            </div>
                        )) : <div className='foundSearchItemNotFound'><span>No Result</span></div>}
                    </div>
                </div>
                
            </div>
            </GridLines>
        </div>
    )
}

export default SearchResultLeft;