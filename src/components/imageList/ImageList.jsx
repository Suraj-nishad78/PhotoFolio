import { useEffect, useState } from "react";
import "./imageList.css";
import Carousel from "../carousel/Carousel";

const ImageList = ({ albumImage, handleDeleteImage, editFormOpen }) => {
  //States Are declare here
  const [viewImage, setViewImage] = useState(false);
  const [viewImageBox, setViewImageBox] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  //hanlde View image big scale
  const handleViewImage = (albumData, index) => {
    setImageIndex(index);
    setViewImage(!viewImage);
    setViewImageBox(albumImage[index]);
  };

  // Carousel Next button
  const handleNextImage = () => {
    const newIndex = imageIndex >= albumImage.length - 1 ? 0 : imageIndex + 1;
    setImageIndex(newIndex);
    setViewImageBox(albumImage[newIndex]);
  };

  // Carousel Previous button
  const handlePrevImage = () => {
    let newIndex;

    if (imageIndex <= 0) {
      newIndex = albumImage.length - 1; // Loop back to last image
    } else {
      newIndex = imageIndex - 1; // Go to previous image
    }

    setImageIndex(newIndex);
    setViewImageBox(albumImage[newIndex]);
  };

  //Hanlde Download image
  const handleDownload = async (imageUrl) => {
    const fileName = "downloaded-image.jpg";

    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. CORS might be blocking it.");
    }
  };

  useEffect(() => {}, [setViewImageBox]);

  return (
    <>
    {/* Image list component code  */}
      <div className="image-list">
        {albumImage.map((albumImage, index) => (
          <div className="image-box" id="image-box" key={albumImage.id}>
            <img
              id="image"
              src={albumImage.imageUrl}
              alt="image-1"
              onClick={() => handleViewImage(albumImage, index)}
            />
            <div id="edit-delete-btn">
              <img
                src="https://photo-folio-cn.netlify.app/assets/edit.png"
                alt="edit"
                onClick={() => editFormOpen(albumImage)}
              />
              <img
                src="https://photo-folio-cn.netlify.app/assets/trash-bin.png"
                alt="delete"
                onClick={() => handleDeleteImage(albumImage.id)}
              />
              <img
                src="https://cdn.pixabay.com/photo/2016/12/18/13/45/download-1915753_1280.png"
                alt="delete"
                onClick={() => handleDownload(albumImage.imageUrl)}
              />
            </div>
            <div id="image-text">
              <p>{albumImage.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* View image on full screen  */}
      {viewImage && (
        // Carousel component
        <Carousel
          viewImageBox={viewImageBox}
          handleViewImage={handleViewImage}
          handlePrevImage={handlePrevImage}
          handleNextImage={handleNextImage}
        />
      )}
    </>
  );
};

export default ImageList;
