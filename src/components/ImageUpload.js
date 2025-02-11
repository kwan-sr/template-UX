import React, {useState, useRef} from "react";
import UploadPhotoIcon from "./image-upload-icon.jpg"

const ImageUpload = () => {

    const fileUploadRef = useRef();
    const [handwritingURL, setHandwritingURL] = useState(UploadPhotoIcon);

    const uploadImageDisplay = () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setHandwritingURL(cachedURL);
    }

    return (
        <div>
            <img 
                src={handwritingURL}
                alt="Photo of child handwriting"
                style={{height:300, width:500}}
            />

            <form id="image_form" encType='multipart/form-data'>
                <input type="file"
                id="file"
                ref={fileUploadRef}
                onChange={uploadImageDisplay}/>
            </form>
        </div>
    )
}

export default ImageUpload