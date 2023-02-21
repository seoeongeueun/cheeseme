import { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function Notes({move, onEdit, note, onCreate, date, userId}){
    const [body, setBody] = useState();
    const [closeQuill, setCloseQuill] = useState(true);
    const [loading, setLoading] = useState(true);
    const quillRef = useRef();
    const [allNotes, setAllNotes] = useState([]);
    const [_id, setId] = useState('');

    useEffect(() => {
        if (userId) {
            axios.get('/api/notes/getByOwner/' + userId)
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
                    console.log('Error loading notes: ', err)
                })
        }
    }, [userId]);

    useEffect(() => {
        if (_id === '') {
            axios.get('/api/notes/getByOwner/' + userId)
            .then((res) => {
                setLoading(true);
                const n = res?.data;
                if (n) {
                    setAllNotes(n);
                }
                else {
                    setAllNotes([])
                }
                return;
            })
            .catch( (err) => {
                console.log('Error loading notes: ', err);
            })
        }
    }, [loading]);

    useEffect(() => {
        if (allNotes?.length > 0 && date) {
            const note = allNotes.find(n => n.date === date);
            if (note) {
                setBody(note?.text);
                setId(note?._id);
                setLoading(false);
            } else {
                setBody('');
                setId('')
                setLoading(true)
            }
        } else {
            setId('');
            setLoading(true);
        }
    }, [allNotes]);
    
    useEffect(() => {
        if (allNotes?.length > 0 && date) {
            const note = allNotes.find(n => n.date === date);
            if (note) {
                setBody(note?.text);
                setId(note?._id);
                setLoading(false);
            } else {
                setBody('');
                setId('')
                setLoading(true)
            }
        } else {
            setId('');
            setLoading(true);
        }
    }, [date]);

    const handleEdit = async() => {
        if (!closeQuill){
            //let tmp = quillRef.current.getEditor().getText();
            let tmp = quillRef.current.editor.container.firstChild.innerHTML;
            setBody(tmp);
            await onEdit(tmp);
            if (loading){
                let res = await FetchAPIPost('/api/notes/add', {
                    owner: userId,
                    date: date,
                    text: tmp  
                });
                setLoading(false)
            } else {
                let res = await FetchAPIPost('/api/notes/updateById/' + _id, {
                    date: date,
                    text: tmp  
                });
            }
            
        }
        setCloseQuill(!closeQuill);
    }

    return (
        <div className="notesWidget">
            <div className='notesHeader'>
                <span style={{marginBottom: '0.2rem'}}>System-Note</span>
                <button onClick={() => handleEdit()}>{closeQuill ? <AddRoundedIcon sx={{fontSize: '20px'}}/> : <CheckRoundedIcon sx={{fontSize: '20px', color: '#f73939'}}/>}</button>
            </div>
            <div className="notesContent">
                <ReactQuill
                    ref={quillRef}
                    readOnly={closeQuill}
                    style={closeQuill ? {border: "none"} : {border: "none"}}
                    modules={closeQuill ? Notes.modules2 : Notes.modules}
                    value={!loading && body}
                    formats={Notes.formats}
                >
                    <div className="ql-container"/>
                </ReactQuill>
            </div>
            {move && <strong ><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
        </div>
    )

}

Notes.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link']
    ],
};

Notes.modules2 = {
    toolbar: false,
};

Notes.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block"
];

export default Notes;