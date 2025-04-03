import "./album.css";

import React, { useEffect } from "react";

const Album = (props) => {
  const { text, albumId, handleBackAndForward } = props;

  return (
    <>
      {/* <div className="album-container"> */}
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
      {/* </div> */}
    </>
  );
};

export default Album;
