import { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';

function Notes({move, onEdit, note}){
    const [body, setBody] = useState(note);
    const [closeQuill, setCloseQuill] = useState(true);
    const quillRef = useRef();
    
    useEffect(() => {

    }, [closeQuill, move, quillRef])

    const handleEdit = async() => {
        if (!closeQuill){
            //let tmp = quillRef.current.getEditor().getText();
            let tmp = quillRef.current.editor.container.firstChild.innerHTML;
            await onEdit(tmp);
        }
        setCloseQuill(!closeQuill);
    }

    return (
        <div className="notesWidget">
            <div className='notesHeader'>
                <span>Notes</span>
                <button onClick={() => handleEdit()}>{closeQuill ? <EditOutlinedIcon sx={{fontSize: '20px'}}/> : <CheckRoundedIcon sx={{fontSize: '20px'}}/>}</button>
            </div>
            <div className="notesContent">
                <ReactQuill
                    ref={quillRef}
                    readOnly={closeQuill}
                    style={closeQuill ? {border: "none"} : {border: "none"}}
                    modules={closeQuill ? Notes.modules2 : Notes.modules}
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