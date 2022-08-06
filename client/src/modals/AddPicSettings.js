import { useEffect, useState } from 'react'
import ReactCrop from 'react-image-crop'
import Crop from 'react-image-crop'
import PixelCrop from 'react-image-crop';
import { PercentCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function AddPicSettings(){
    const [selectedImage, setSelectedImage] = useState();
    const [postImage, setPostImage] = useState(false);
    const [completedCrop, setCompletedCrop] = useState();
    const [crop, setCrop] = useState<PercentCrop>({
        unit: '%',
    });

    useEffect(() => {
        console.log('c: ', crop);

    }, [postImage, crop, selectedImage, completedCrop]);

    const onUploadImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setPostImage(true);
          }
    };

    return(
        <div className="settingsbox">
            <div className="checkboxlist">
                <p1 style={{textAlign: "left"}}>Add Sticker</p1>
                <div className="stickerUpload">
                    <IconButton className="uploadIconMini" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                        <input hidden accept="image/*" type="file" onChange={onUploadImage}/>
                        <PhotoCamera sx={{fontSize: "5rem", color: "#929292"}}/>
                    </IconButton>
                    {postImage && <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}><img src={URL.createObjectURL(selectedImage)} alt="Thumb"/></ReactCrop>}
                    {completedCrop && <div style={{border: '1px solid black', width: completedCrop.width, height: completedCrop.height}}><img src={URL.createObjectURL(selectedImage)} style={{objectFit: 'contain'}}/></div>}
                </div>
            </div>
        </div>
    );
}

export default AddPicSettings;