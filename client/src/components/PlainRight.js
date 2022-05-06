import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";

function PlainRight() {
    const [body, setBody] = useState("")

    useEffect(()=> {

    })

    const handleBody = (e) => {
        setBody(e);
    }

    return(
        <div className="rightBody">
            <ReactQuill
                placeholder="Share your story"
                modules={PlainRight.modules}
                formats={PlainRight.formats}
                onChange={handleBody}
                value={body}
            />
            <div className="plainRightButtons">
                <button>setting</button>
            </div>
        </div>
    )
}

PlainRight.modules = {
    toolbar: [
        [{ header: "1" }, { header : "2" }, { header: [3, 4, 5, 6] }, { font: []}],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
    ]
};

PlainRight.formats = [
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

export default PlainRight;