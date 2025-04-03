import { useState } from "react";
import "./imageForm.css";
import { imageRef } from "../../../config/firebaseinit";
import { toast } from "react-toastify";
import { doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {db} from "../../../config/firebaseinit"
import ImageList from "../imageList/ImageList";

const ImageForm = ({
  handleBackAndForward,
  currentAlbum,
  albumId,
  albumImage,
  getImageBYAlbum,
}) => {
  const [showImageForm, setShowImageForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showSerchInput, setShowSerchInput] = useState(false);
  const [searchText, setSeacthText] = useState("");
  const [updateBtn, setUpdateBtn] = useState(false)
  const [addBtn, setAddBtn] = useState(true)
  const [imageUpdatId, setImageUpdateId] = useState('')

  const showSearchInputBox = () => {
    setShowSerchInput(!showSerchInput);
    setSeacthText("");
  };

  const handleSeachInput = (e) => {
    setSeacthText(e.target.value);
  };

  const handleImageForm = () => {
    setShowImageForm(!showImageForm);
    setShowBtn(!showBtn);
    if(updateBtn == true){
        setUpdateBtn(false)
        setAddBtn(true)
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const clearInput = () => {
    setTitle("");
    setImageUrl("");
    setImageUpdateId("");
  };

  const handleAddImage = async () => {
    try {
      if (!title.trim() || !imageUrl.trim()) {
        alert("Please fill the required fields.");
        return;
      }
      const imageData = {
        albumId,
        title,
        imageUrl,
      };
      toast.success("Image added successfully.");
      await addDoc(imageRef, imageData);
      getImageBYAlbum();
      clearInput();
    } catch (err) {
      console.log("Error while adding images: ", err);
    }
  };

  const handleDeleteImage = async(id) =>{
    try{
        const confirmation = confirm('Are you sure you want to delete this image?')
        if(!confirmation){
            return;
        }
        const deleteImage = doc(db, 'image', id)
        await deleteDoc(deleteImage)
        toast.success("Image deleted successfully.")
        clearInput()
        getImageBYAlbum()
    } catch(err){
        console.log("Error while deleting image: ", err);
    }
  }

  const editFormOpen = (albumData) =>{
    setShowImageForm(!showImageForm);
    setShowBtn(!showBtn);
    setUpdateBtn(!updateBtn)
    setAddBtn(!addBtn)
    setTitle(albumData.title);
    setImageUpdateId(albumData.id)
    setImageUrl(albumData.imageUrl);
  }

  const handleEditImage = async() =>{
    try{
        const confirmation = confirm('Are you sure you want to edit this image?')
        if(!confirmation){
            return;
        }
        const updateData = {
            title:title,
            imageUrl:imageUrl
        }
        const editImage = doc(db, 'image', imageUpdatId)
        await updateDoc(editImage, updateData)
        toast.success("Image updated successfully.")
        setUpdateBtn(!updateBtn)
        setAddBtn(!addBtn)
        clearInput()
        getImageBYAlbum()
    } catch(err){
        console.log("Error while editing image: ", err);
    }
  }

  return (
    <>
      <div className="image-form-container">
        <div className="image-title">
          <div className="image-para">
            <img
              src="https://photo-folio-cn.netlify.app/assets/back.png"
              alt="back-image"
              onClick={handleBackAndForward}
            />
            {albumImage.length ? (
              <p>Images in {currentAlbum}</p>
            ) : (
              <p>No image found in the {currentAlbum}</p>
            )}
          </div>
          <div style={{ display: "flex", gap: "3em", alignItems: "center" }}>
            <div className="image-search">
              {showSerchInput && (
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSeachInput}
                  placeholder="Search..."
                />
              )}
              {!showSerchInput && (
                <img
                  src="https://photo-folio-cn.netlify.app/assets/search.png"
                  alt="search-image"
                  onClick={showSearchInputBox}
                />
              )}
              {showSerchInput && (
                <img
                  src="https://photo-folio-cn.netlify.app/assets/clear.png"
                  alt="cross-image"
                  onClick={showSearchInputBox}
                />
              )}
            </div>
            {showBtn && (
              <button id="add-image" onClick={handleImageForm}>
                Add image
              </button>
            )}
            {showImageForm && (
              <button id="cancel" onClick={handleImageForm}>
                Cancel
              </button>
            )}
          </div>
        </div>
        {showImageForm && (
          <div className="image-form">
            <h1>Add image to {currentAlbum}</h1>
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={handleTitle}
            />
            <input
              type="text"
              value={imageUrl}
              placeholder="Image URL"
              onChange={handleImageUrl}
            />
            <div id="clear-add-btn">
              <button id="clear" onClick={clearInput}>
                Clear
              </button>
              { addBtn && (<button id="add" onClick={handleAddImage}>
                Add
              </button>)}
              { updateBtn && (<button id="update" onClick={handleEditImage}>
                Update
              </button>)}
            </div>
          </div>
        )}
      </div>
      <ImageList albumImage={albumImage} handleDeleteImage={handleDeleteImage} editFormOpen={editFormOpen}/>
    </>
  );
};

export default ImageForm;
