import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';

function Notes(props){
    const [body, setBody] = useState("");
    const [closeQuill, setCloseQuill] = useState(true);

    useEffect(() => {

    }, [closeQuill, props.move])

    return (
        <div className="notesWidget">
            {props.move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            <div className='notesHeader'>
                <span>Notes</span>
                <button onClick={() => setCloseQuill(!closeQuill)}>{closeQuill ? <EditOutlinedIcon sx={{fontSize: '20px'}}/> : <CheckRoundedIcon sx={{fontSize: '20px'}}/>}</button>
            </div>
            <div className="notesContent">
                <ReactQuill
                    readOnly={closeQuill}
                    style={closeQuill ? {border: "none"} : {border: "none"}}
                    modules={closeQuill ? Notes.modules2 : Notes.modules}
                    formats={Notes.formats}
                >
                    <div className="ql-container"/>
                </ReactQuill>
            </div>
        </div>
    )

}

Notes.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image']
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