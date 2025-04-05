import "./album.css";

import React from "react";


const AlbumList = (props) => {
  const { text, albumId, handleBackAndForward } = props;

  return (
    <>
      <div
        className="album-box"
        onClick={() => handleBackAndForward(text, albumId)}
      >
        <div id="album-image">
          <img
            src="https://photo-folio-cn.netlify.app/assets/photos.png"
            alt="random-image"
          />
        </div>
        <div id="album-title">
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default AlbumList;
