import axios from 'axios';
import { useEffect, useState } from 'react';
import Highlighter from "react-highlight-words";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';


function SearchResultRight({onChangeDate, keyword, setSearch, userId}){
    const [foundPosts, setFoundPosts] = useState();
    const [clicked, setClicked] = useState();
    const [searchBy, setSearchBy] = useState('Content');
    const [showOption, setShowOption] = useState(false);
    const instance = axios.create({
        baseURL: process.env.NODE_ENV !== 'production' ? 'https://localhost:8080//' : "https://cheese-me.fly.dev/",
      });

    useEffect(() => {
        if (keyword && userId) {
            if (searchBy === 'Title'){
                instance.get('/api/right/getByOwner/' + userId, {
                    withCredentials: true
                })
                .then( (res) => {
                    const n = res?.data;
                    if (n) setFoundPosts(res?.data.filter(n => n.title.toLowerCase().includes(keyword.toLowerCase())));
                    return;
                })
                .catch( (err) => {
                    console.log('Error loading posts: ', err)
                });
            }
            else if (searchBy === 'Content'){
                instance.get('/api/right/getByOwner/' + userId, {
                    withCredentials: true
                })
                .then( (res) => {
                    const n = res?.data;
                    if (n) setFoundPosts(res?.data.filter(n => n.text.toLowerCase().includes(keyword.toLowerCase())));
                    return;
                })
                .catch( (err) => {
                    console.log('Error loading posts: ', err)
                });
            }
        }
    }, [keyword, searchBy, userId])

    useEffect(() => {
        console.log(foundPosts)
    }, [foundPosts])

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
        
        if (indexes.length > 5 ) {
            let result = "";
            for (let i = 0; i < 5; i++) {
                if (indexes[i] + val.length >= arr.length){
                    if (indexes[i] - 20 <= 0) {
                        result = result + (arr.substring(0, indexes[i] + val.length))
                    } else {
                        result = result + ('...' + arr.substring(indexes[i] - 40, indexes[i] + val.length))
                    }
                } else if (indexes[i] === 0){
                    if (indexes[i] + val.length + 40 >= arr.length) {
                        result = result + (arr.substring(indexes[i], arr.length))
                    } else {
                        result = result + (arr.substring(indexes[i], indexes[i] + val.length + 40) + '...')
                    }
                }
                else {
                    result = result + ('...' + arr.substring(indexes[i] - 20, indexes[i] + val.length + 20) + '...')
                }

            }
            return result
        } else if (indexes.length < 3) {
            let result = "";
            for (let i = 0; i < indexes.length; i++) {
                if (indexes[i] + val.length >= arr.length){
                    if (indexes[i] - 50 <= 0) {
                        result = result + (arr.substring(0, indexes[i] + val.length))
                    } else {
                        result = result + ('...' + arr.substring(indexes[i] - 100, indexes[i] + val.length))
                    }
                } else if (indexes[i] === 0){
                    if (indexes[i] + val.length + 100 >= arr.length) {
                        result = result + (arr.substring(indexes[i], arr.length))
                    } else {
                        result = result + (arr.substring(indexes[i], indexes[i] + val.length + 100) + '...')
                    }
                }
                else {
                    if (indexes[i] - 50 <= 0) {
                        result = result + (arr.substring(0, indexes[i] + val.length + 100) + '...')
                    } else {
                        result = result + ('...' + arr.substring(indexes[i] - 100, indexes[i] + val.length))
                    }
                    
                }
            }
            return result
        } else {
            let result = "";
            for (let i = 0; i < indexes.length; i++) {
                if (indexes[i] + val.length >= arr.length){
                    if (indexes[i] - 25 <= 0) {
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
                    result = result + ('...' + arr.substring(indexes[i] - 25, indexes[i] + val.length + 25) + '...')
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

    const handleSearchOption = () => {
        setShowOption(!showOption)
    }

    const handleSearchBy = (option) => {
        if (option === 'Title'){
            setSearchBy('Title');
            setShowOption(false)
        }
        else if (option === 'Content'){
            setSearchBy('Content');
            setShowOption(false)
        }
    }

    return (
        <div className='leftInnerBorder'>
            <div className="leftContentSearch">
                <p style={{textAlign: "center"}}>Searching Posts for <b>{keyword}</b></p>
                <div className="searchOption">
                    <div className='searchOptionHeader' onClick={() => handleSearchOption()}>
                        <span style={{marginRight: "1rem"}}>Search by</span>
                        <span style={{color: "#F9D876"}}>{showOption ? '' : searchBy}</span>
                    </div>
                    <div className='searchOptionContent'>
                        <div className='searchOptionDrop'>
                            {showOption && <span onClick={() => handleSearchBy('Content')}> Content</span>}
                            {showOption && <span onClick={() => handleSearchBy('Title')}> Title</span>}
                        </div>
                    </div>
                </div>
                <div className='foundWidgetCategory'>
                    <div className='foundWidgetHeader'>
                        <span>Posts</span>
                        <div class="line-yellow-short"/>
                    </div>
                    {foundPosts?.length > 0 ? foundPosts.map((note) => (
                        <div className='foundSearchItem' onClick={() => handleClick(note.date)}>
                            <span className='foundDate'>{new Date(note.date).getMonth()+1}.{new Date(note.date).getDate()}.{new Date(note.date).getFullYear()}</span>
                            <div className='foundContent'>
                                {note.title.length <= 0 ? <span>제목없음</span> : <Highlighter highlightTag={"b"} searchWords={[keyword]} textToHighlight={note.title} />}
                                {searchBy === 'Title' ? <span>{removeTags(note.text).substring(0, 100).length >= 100 ? removeTags(note.text).substring(0, 100) + '...' : removeTags(note.text).substring(0, 100)}</span>
                                : <Highlighter highlightTag={"b"} searchWords={[keyword]} textToHighlight={cutString(note.text, keyword)} />}
                            </div>
                        </div>
                    )) : <div className='foundSearchItemNotFound'><span>No Result</span></div>}
                </div>
            </div>
        </div>
    )
}

export default SearchResultRight;