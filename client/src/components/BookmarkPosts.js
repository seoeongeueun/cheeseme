import axios from 'axios';
import { useEffect, useState } from 'react';
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch } from 'react-redux';
import { changeDate } from '../modules/datePick';


function BookmarkPosts(props){
    const [foundPosts, setFoundPosts] = useState([]);
    const [clicked, setClicked] = useState();
    const dispatch = useDispatch();
    const onChangeDate = d => dispatch(changeDate(d));
    const instance = axios.create({
        baseURL: "https://cheese-me.fly.dev/",
      });

    useEffect(() => {
        if (props.allPosts && props.friendId === '') {
            console.log(props.allPosts)
            setFoundPosts(props.allPosts.filter(p => p.bookmark === true))
        } else {
            instance.get('/api/right/getByOwner/' + props.userId)
                .then((res) => {
                    const n = res?.data;
                    if (n) {
                        let tmp = n.sort((a, b) => a.date - b.date)
                        setFoundPosts(tmp.filter(p => p.bookmark === true))
                    }
                    else {
                        setFoundPosts([])
                    }
                })
                .catch((err) => {
                    console.log('Error loading posts: ', err)
                })
        }
    }, [props.allPosts]);

    function removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, '');
    }

    const handleClick = (date) => {
        console.log(date);
        setClicked(date);
        onChangeDate(date);
        props.setOpenBookmark(false);
        props.onSetFriendId('');

    };

    return (
        <div className='bookmarkInnerBorder'>
            <div className="rightBookmarkPosts">
                <p style={{textAlign: "center"}}>Bookmarked Posts</p>
                <div className='foundPostsCategory'>
                    {foundPosts?.length > 0 ? foundPosts.map((p) => (
                        <div className='foundSearchItem' onClick={() => handleClick(p.date)}>
                            <span className='foundDate'>{new Date(p.date).getMonth()+1}.{new Date(p.date).getDate()}.{new Date(p.date).getFullYear()}</span>
                            <div className='foundContent'>
                                {p.title.length <= 0 ? <span className='foundContentTitle'>No Title</span> : <span className='foundContentTitle'>{p.title}</span>}
                                <span style={{marginLeft: '3rem'}}>{removeTags(p.text).substring(0, 200).length >= 200 ? removeTags(p.text).substring(0, 200) + '...' : removeTags(p.text).substring(0, 200)}</span>
                            </div>
                        </div>
                    )) : <div className='foundSearchItemNotFound'>{props.userId ? <span>No Bookmarked Posts Yet</span> : <span>Login Required</span>}</div>}
                </div>
            </div>
        </div>
    )
}

export default BookmarkPosts;