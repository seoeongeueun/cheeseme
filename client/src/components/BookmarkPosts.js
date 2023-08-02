import axios from 'axios';
import { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector, useDispatch } from 'react-redux';
import { changeDate } from '../modules/datePick';
import GridLines from 'react-gridlines';

function BookmarkPosts(props) {
  const [foundPosts, setFoundPosts] = useState([]);
  const [clicked, setClicked] = useState();
  const colorCode = [
    'rgba(253, 223, 126, 0.3)',
    'rgba(103, 235, 250, 0.3)',
    'rgba(250, 169, 157, 0.3)',
    'rgba(155, 251, 225, 0.3)',
    'rgba(206, 151, 251, 0.3)',
  ];

  const dispatch = useDispatch();
  const onChangeDate = (d) => dispatch(changeDate(d));
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080/'
        : 'https://cheese-me.fly.dev/',
  });

  useEffect(() => {
    if (props.allPosts && props.friendId === '') {
      console.log(props.allPosts);
      setFoundPosts(props.allPosts.filter((p) => p.bookmark === true));
    } else {
      instance
        .get('/api/right/getByOwner/' + props.userId, {
          withCredentials: true,
        })
        .then((res) => {
          const n = res?.data;
          if (n) {
            let tmp = n.sort((a, b) => a.date - b.date);
            setFoundPosts(tmp.filter((p) => p.bookmark === true));
          } else {
            setFoundPosts([]);
          }
        })
        .catch((err) => {
          console.log('Error loading posts: ', err);
        });
    }
  }, [props.allPosts]);

  function removeTags(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  const handleClick = (date) => {
    console.log(date);
    setClicked(date);
    onChangeDate(date);
    props.setOpenBookmark(false);
    props.onSetFriendId('');
  };

  return (
    <GridLines
      className="grid-area"
      cellWidth={60}
      strokeWidth={1}
      strokeWidth2={1}
      cellWidth2={12}
      lineColor2={'#e1e1e1'}
      lineColor={'#d4d4d4'}
    >
      <div className="bookmarkInnerBorder">
        <div className="rightBookmarkPosts">
          <p style={{ textAlign: 'center', fontSize: '3rem' }}>
            Bookmarked Posts
          </p>
          <div className="foundPostsCategory">
            {foundPosts?.length > 0 ? (
              foundPosts.map((p, index) => (
                <div
                  className="foundSearchItem"
                  onClick={() => handleClick(p.date)}
                >
                  <span className="foundDate">
                    {new Date(p.date).getMonth() + 1}.
                    {new Date(p.date).getDate()}.
                    {new Date(p.date).getFullYear()}
                  </span>
                  <div className="foundContent">
                    {p.title.length <= 0 ? (
                      <span
                        className="foundContentTitle"
                        style={{
                          width: 'max-content',
                          backgroundColor: colorCode[index % colorCode.length],
                        }}
                      >
                        No Title
                      </span>
                    ) : (
                      <span
                        className="foundContentTitle"
                        style={{
                          width: 'max-content',
                          backgroundColor: colorCode[index % colorCode.length],
                        }}
                      >
                        {p.title}
                      </span>
                    )}
                    <span style={{ marginLeft: '3rem' }}>
                      {removeTags(p.text).substring(0, 200).length >= 200
                        ? removeTags(p.text).substring(0, 200) + '...'
                        : removeTags(p.text).substring(0, 200)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="foundSearchItemNotFound">
                {props.userId ? (
                  <span>No Bookmarked Posts Yet</span>
                ) : (
                  <span>Login Required</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </GridLines>
  );
}

export default BookmarkPosts;
