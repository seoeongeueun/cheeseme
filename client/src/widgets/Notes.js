import { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import '../../node_modules/quill/dist/quill.snow.css';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';
import { FetchAPIPost } from '../utils/api.js';

function Notes({ move, onEdit, note, onCreate, date, userId }) {
  const [body, setBody] = useState();
  const [closeQuill, setCloseQuill] = useState(true);
  const [loading, setLoading] = useState(true);
  const quillRef = useRef();
  const [allNotes, setAllNotes] = useState([]);
  const [_id, setId] = useState('');
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080/'
        : 'https://cheese-me.fly.dev/',
  });

  useEffect(() => {
    if (userId) {
      instance
        .get('/api/notes/getByOwner/' + userId, {
          withCredentials: true,
        })
        .then((res) => {
          const n = res?.data;
          if (n) {
            setAllNotes(n);
          } else {
            setAllNotes([]);
          }
          return;
        })
        .catch((err) => {
          console.log('Error loading notes: ', err);
        });
    } else {
      setAllNotes([
        {
          date: new Date().setHours(0, 0, 0, 0),
          text: 'Welcome!<br>If you need help with using CheeseMe, visit <a href="https://github.com/seoeongeueun/cheeseme#table-of-contents">HERE</a>',
        },
      ]);
    }
  }, [userId]);

  useEffect(() => {
    if (_id === '' && userId) {
      instance
        .get('/api/notes/getByOwner/' + userId, {
          withCredentials: true,
        })
        .then((res) => {
          setLoading(true);
          const n = res?.data;
          if (n) {
            setAllNotes(n);
          } else {
            setAllNotes([]);
          }
          return;
        })
        .catch((err) => {
          console.log('Error loading notes: ', err);
        });
    }
  }, [loading]);

  useEffect(() => {
    if (allNotes?.length > 0 && date) {
      const note = allNotes.find((n) => n.date === date);
      if (note) {
        setBody(note?.text);
        setId(note?._id);
        setLoading(false);
      } else {
        setBody('');
        setId('');
        setLoading(true);
      }
    } else {
      setId('');
      setLoading(true);
    }
  }, [allNotes]);

  useEffect(() => {
    if (allNotes?.length > 0 && date) {
      const note = allNotes.find((n) => n.date === date);
      if (note) {
        setBody(note?.text);
        setId(note?._id);
        setLoading(false);
      } else {
        setBody('');
        setId('');
        setLoading(true);
      }
    } else {
      setId('');
      setLoading(true);
    }
  }, [date]);

  const handleEdit = async () => {
    if (!closeQuill) {
      //let tmp = quillRef.current.getEditor().getText();
      let tmp = quillRef.current.editor.container.firstChild.innerHTML;
      setBody(tmp);
      await onEdit(tmp);
      if (loading) {
        let res = await FetchAPIPost('/api/notes/add', {
          owner: userId,
          date: date,
          text: tmp,
        });
        setLoading(false);
      } else {
        let res = await FetchAPIPost('/api/notes/updateById/' + _id, {
          date: date,
          text: tmp,
        });
      }
    }
    setCloseQuill(!closeQuill);
  };

  return (
    <div className="notesWidget">
      <div className="notesHeader">
        <span style={{ marginBottom: '0.2rem' }}>Note</span>
        <button onClick={() => handleEdit()}>
          {closeQuill ? (
            <AddRoundedIcon sx={{ fontSize: '20px' }} />
          ) : (
            <CheckRoundedIcon sx={{ fontSize: '20px', color: '#f73939' }} />
          )}
        </button>
      </div>
      <div className="notesContent">
        <ReactQuill
          ref={quillRef}
          readOnly={closeQuill}
          style={closeQuill ? { border: 'none' } : { border: 'none' }}
          modules={
            !closeQuill
              ? {
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['link'],
                  ],
                }
              : { toolbar: false }
          }
          value={!loading && body}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'link',
            'image',
            'video',
            'code-block',
          ]}
        >
          <div className="ql-container" />
        </ReactQuill>
      </div>
      {move && (
        <strong>
          <OpenWithSharpIcon sx={{ fontSize: '7rem' }} />
        </strong>
      )}
    </div>
  );
}

export default Notes;
