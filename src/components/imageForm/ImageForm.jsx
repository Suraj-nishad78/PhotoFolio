import { useState } from "react"
import "./imageForm.css"
import {imageRef} from "../../../config/firebaseinit"
import {getDocs, addDoc} from "firebase/firestore"

const ImageForm = ({handleBackAndForward, currentAlbum, albumId}) => {

    const [showImageForm, setShowImageForm] = useState(false)
    const [showBtn, setShowBtn] = useState(true)
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleImageForm = () =>{
        setShowImageForm(!showImageForm)
        setShowBtn(!showBtn)
    }

    const handleTitle = (e) =>{
        setTitle(e.target.value)
    }
    
    const handleImageUrl = (e) =>{
        setImageUrl(e.target.value)
    }
    
    const clearInput = () =>{
        setTitle("")
        setImageUrl("")
    }

    const handleAddImage = async() =>{
        try{
            if(!title.trim() || !imageUrl.trim()){
                alert('Please fill the required fields.')
                return;
            }
            const imageData = {
                albumId,
                title,
                imageUrl
            }
            await addDoc(imageRef, imageData)
            clearInput();
        }catch(err){
            console.log("Error while adding images: ", err);
        }
    }

  return (
    <div className="image-form-container">
        <div className="image-title">
            <img src="https://photo-folio-cn.netlify.app/assets/back.png" alt="back-image" onClick={handleBackAndForward}/>
            <p>No image found in the album</p>
            { showBtn && (
            <button id="add-image" onClick={handleImageForm}>Add image</button>
            )}
            { showImageForm && (
            <button id="cancel" onClick={handleImageForm}>Cancel</button>
            )}
        </div>
        {showImageForm && (<div className="image-form">
            <h1>Add image to {currentAlbum}</h1>
            <input type="text" value={title} placeholder="Title" onChange={handleTitle}/>
            <input type="text" value={imageUrl} placeholder="Image URL" onChange={handleImageUrl}/>
            <div id="clear-add-btn">
                <button id="clear" onClick={clearInput}>Clear</button>
                <button id="add" onClick={handleAddImage}>Add</button>
            </div>
        </div>)}
    </div>
  )
}

export default ImageForm
