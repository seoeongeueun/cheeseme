import axios from 'axios';
import { useEffect, useState } from 'react';
import Highlighter from "react-highlight-words";
import GridLines from 'react-gridlines';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';


function SearchResultRight({onChangeDate, keyword, setSearch, userId}){
    const [foundPosts, setFoundPosts] = useState();
    const [clicked, setClicked] = useState();
    const [searchBy, setSearchBy] = useState('Content');
    const [showOption, setShowOption] = useState(false);
    const colorCode = ['rgba(253, 223, 126, 0.3)', 'rgba(103, 235, 250, 0.3)', 'rgba(250, 169, 157, 0.3)', 'rgba(155, 251, 225, 0.3)', 'rgba(206, 151, 251, 0.3)'];
    const instance = axios.create({
        baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/' : "https://cheese-me.fly.dev/",
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

    const handleClickHome = () => {
        window.location.reload(false);
    }

    return (
        <div className='leftInnerBorder'>
            <GridLines className="grid-area" cellWidth={60} strokeWidth={1} strokeWidth2={1} cellWidth2={12} lineColor2={"#e1e1e1"} lineColor={"#d4d4d4"}>
            <div className="leftContentSearch">
                <div className='marker' onClick={() => handleClickHome()}>
                    <span style={{margin: '0rem 1rem 1.5rem 0rem'}}><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>
                <p style={{textAlign: "center"}}>Searching Posts for <b>{keyword}</b></p>
                <div className="searchOption">
                    <div className='searchOptionHeader' onClick={() => handleSearchOption()}>
                        <span style={{marginRight: "1rem"}}>Search by</span>
                        {!showOption && <button><span style={{fontSize: '2rem', color: '#f73939'}}>{searchBy}</span></button>}
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
                    <div className='foundSearchItems'>
                    {foundPosts?.length > 0 ? foundPosts.map((note, index) => (
                        <div className='foundSearchItem' onClick={() => handleClick(note.date)} style={{marginTop: index === 0 && '0.5rem'}}>
                            <span className='foundDate'>{new Date(note.date).getMonth()+1}.{new Date(note.date).getDate()}.{new Date(note.date).getFullYear()}</span>
                            <div className='foundContent'>
                                {note.title.length <= 0 ? <span style={{backgroundColor: colorCode[index%colorCode.length]}}>제목없음</span> : searchBy === 'Title' ? <Highlighter highlightTag={"b"} searchWords={[keyword]} textToHighlight={note.title} highlightStyle={{width: 'max-content', backgroundColor: colorCode[index%colorCode.length]}}/> : <span style={{width: 'max-content', backgroundColor: colorCode[index%colorCode.length]}}>{note.title}</span>}
                                {searchBy === 'Title' ? <span>{removeTags(note.text).substring(0, 100).length >= 100 ? removeTags(note.text).substring(0, 100) + '...' : removeTags(note.text).substring(0, 100)}</span>
                                : <Highlighter highlightTag={"b"} searchWords={[keyword]} textToHighlight={cutString(note.text, keyword)} highlightStyle={{backgroundColor: colorCode[index%colorCode.length]}}/>}
                            </div>
                        </div>
                    )) : <div className='foundSearchItemNotFound'><span>No Result</span></div>}
                    </div>
                </div>
            </div>
            </GridLines>
        </div>
    )
}

export default SearchResultRight;