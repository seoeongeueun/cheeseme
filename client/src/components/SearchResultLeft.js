import axios from 'axios';
import { useEffect, useState } from 'react';

function SearchResultLeft(props){
    const [foundNotes, setFoundNotes] = useState();

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
            })
        }
    }, [props.keyword])

    useEffect(() => {
        console.log(foundNotes);
    }, [foundNotes])

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
        while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
        }
        
        let result = []
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i] + val.length >= arr.length){
                if (indexes[i] - 10 <= 0) {
                    result.push(arr.substring(0, indexes[i] + val.length))
                } else {
                    result.push('...' + arr.substring(indexes[i] - 20, indexes[i] + val.length))
                }
            } else if (indexes[i] === 0){
                if (indexes[i] + val.length + 20 >= arr.length) {
                    result.push(arr.substring(indexes[i], arr.length))
                } else {
                    result.push(arr.substring(indexes[i], indexes[i] + val.length + 20) + '...')
                }
            }
            else {
                result.push('...' + arr.substring(indexes[i], indexes[i] + val.length) + '...')
            }
            
        }
        console.log('here')
        console.log(result)
        return result
    }

    return (
        <div className='leftInnerBorder'>
            <div className="leftContent">
                <p>Search Results for <b>{props.keyword}</b></p>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>Notes </span>
                    </div>
                    {foundNotes?.length > 0 && foundNotes.map((note) => (
                        <div className='foundSearchItem'>
                            <span>{new Date(note.date).getMonth()+1}.{new Date(note.date).getDate()}.{new Date(note.date).getFullYear()}</span>
                            <span>{cutString(note.text.toLowerCase(), props.keyword).map((s) => (
                                <div className='foundMatch'>
                                    <span>{s}</span>
                                </div>
                            ))}</span>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default SearchResultLeft;