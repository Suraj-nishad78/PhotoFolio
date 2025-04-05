import "./carousel.css";

//Carousel Component
const Carousel = ({
  viewImageBox,
  handleViewImage,
  handlePrevImage,
  handleNextImage,
}) => {
  return (
    <>
      <div className="image-viewer">
        <img id="main-image" src={viewImageBox.imageUrl} alt="image" />
        <button id="close-image" onClick={handleViewImage}>
          X
        </button>
        <button id="left" onClick={handlePrevImage}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button id="right" onClick={handleNextImage}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </>
  );
};

export default Carousel;
