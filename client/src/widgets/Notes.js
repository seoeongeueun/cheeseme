import { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function Notes({move, onEdit, note, onCreate, dateOnly}){
    const [body, setBody] = useState(note);
    const [closeQuill, setCloseQuill] = useState(true);
    const [loading, setLoading] = useState(false);
    const quillRef = useRef();

    useEffect(() => {
        console.log(dateOnly)
        axios.get('/api/notes/' + dateOnly)
            .then( (res) => {
                setLoading(true);
                const n = res?.data;
                setBody(n);
                return;
            })
            .catch( (err) => {
                console.log('Error loading note')
                setLoading(false);
            })
    }, [])
    
    useEffect(() => {

    }, [closeQuill, move, quillRef, body])

    const handleEdit = async() => {
        if (!closeQuill){
            //let tmp = quillRef.current.getEditor().getText();
            let tmp = quillRef.current.editor.container.firstChild.innerHTML;
            await onEdit(tmp);
            let res = await FetchAPIPost('/api/notes/update/' + dateOnly, {
                date: dateOnly,
                text: tmp  
            });
        }
        setCloseQuill(!closeQuill);
    }

    return (
        <div className="notesWidget">
            <div className='notesHeader'>
                <span style={{marginBottom: '0.4rem'}}>Notes</span>
                <button onClick={() => handleEdit()}>{closeQuill ? <AddRoundedIcon sx={{fontSize: '20px'}}/> : <CheckRoundedIcon sx={{fontSize: '20px', color: 'red'}}/>}</button>
            </div>
            <div className="notesContent">
                <ReactQuill
                    ref={quillRef}
                    readOnly={closeQuill}
                    style={closeQuill ? {border: "none"} : {border: "none"}}
                    modules={closeQuill ? Notes.modules2 : Notes.modules}
                    value={body}
                    formats={Notes.formats}
                    onChange={setBody}
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