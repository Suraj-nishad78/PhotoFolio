import { useState } from "react";
import "./imageList.css";

const ImageList = ({ albumImage, handleDeleteImage, editFormOpen }) => {
  const [viewImage, setViewImage] = useState(false);
  const [viewImageBox, setViewImageBox] = useState({});

  const handleViewImage = (albumData) => {
    const { id, imageUrl, title } = albumData;
    setViewImage(!viewImage);
    setViewImageBox(albumData);
  };

  return (
    <>
      <div className="image-list">
        {albumImage.map((albumImage) => (
          <div
            className="image-box"
            id="image-box"
            key={albumImage.id}
            
          >
            <img id="image" src={albumImage.imageUrl} alt="image-1" onClick={() => handleViewImage(albumImage)}/>
            <div id="edit-delete-btn">
              <img
                src="https://photo-folio-cn.netlify.app/assets/edit.png"
                alt="edit"
                onClick={()=>editFormOpen(albumImage)}
              />
              <img
                src="https://photo-folio-cn.netlify.app/assets/trash-bin.png"
                alt="delete"
                onClick={()=>handleDeleteImage(albumImage.id)}
              />
            </div>
            <div id="image-text">
              <p>{albumImage.title}</p>
            </div>
          </div>
        ))}
      </div>
      {viewImage && (
        <div className="image-viewer">
          <img id="main-image" src={viewImageBox.imageUrl} alt="image" />
          <button id="close-image" onClick={handleViewImage}>
            X
          </button>
          <button id="left">
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <button id="right">
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default ImageList;
