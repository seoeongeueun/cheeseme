import axios from 'axios';
import { useEffect, useState } from 'react';
import Highlighter from "react-highlight-words";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';


function SearchResultRight({onChangeDate, keyword, setSearch}){
    const [foundPosts, setFoundPosts] = useState();
    const [clicked, setClicked] = useState();
    const [searchBy, setSearchBy] = useState('Content');
    const [showOption, setShowOption] = useState(false);

    useEffect(() => {
        if (keyword) {
            if (searchBy === 'Title'){
                axios.get('/api/right/search/title/' + keyword)
                .then( (res) => {
                    const n = res?.data;
                    if (n) setFoundPosts(n);
                    return;
                })
                .catch( (err) => {
                    console.log('Error loading posts: ', err)
                });
            }
            else if (searchBy === 'Content'){
                axios.get('/api/right/search/text/' + keyword)
                .then( (res) => {
                    const n = res?.data;
                    if (n) setFoundPosts(n);
                    return;
                })
                .catch( (err) => {
                    console.log('Error loading posts: ', err)
                });
            }
        }
    }, [keyword, searchBy])

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
                    </div>
                    {foundPosts?.length > 0 ? foundPosts.map((note) => (
                        <div className='foundSearchItem' onClick={() => handleClick(note.date)}>
                            <span className='foundDate'>{new Date(note.date).getMonth()+1}.{new Date(note.date).getDate()}.{new Date(note.date).getFullYear()}</span>
                            <Highlighter highlightTag={"b"} searchWords={[keyword]} textToHighlight={cutString(note.text.toLowerCase(), keyword)} />
                        </div>
                    )) : <div className='foundSearchItem'><span>No Result</span></div>}
                </div>
            </div>
        </div>
    )
}

export default SearchResultRight;