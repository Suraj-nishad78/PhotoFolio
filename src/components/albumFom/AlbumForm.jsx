import { useEffect, useState } from "react";
import "./styles.css";
import Album from "../album/Album";
import { toast } from "react-toastify";

import { db, albumRef } from "../../../config/firebaseinit";
import { getDocs, addDoc } from "firebase/firestore";

const AlbumForm = ({ handleBackAndForward }) => {
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [albumInput, setAlbumInput] = useState("");
  const [albumsData, setAlbumsData] = useState([]);

  const handleShowForm = () => {
    setShowAlbumForm(!showAlbumForm);
    setShowBtn(!showBtn);
  };

  const handleAlbumInput = (e) => {
    setAlbumInput(e.target.value);
  };

  const createAlbum = async () => {
    try {
      if (!albumInput.trim()) {
        alert("Please fill the input box.");
        return;
      }
      const album = { text: albumInput };
      await addDoc(albumRef, album);
      toast.success("Album created successfully.");
      setAlbumInput("");
    } catch (error) {
      console.log("Error while creating album: ", error);
    }
  };

  const clearAlbumInput = () => {
    setAlbumInput("");
  };

  const getAlbum = async () => {
    try {
      let albums = await getDocs(albumRef);
      albums = albums.docs.map((album) => ({
        id: album.id,
        ...album.data(),
      }));
      setAlbumsData(albums);
      return;
    } catch (err) {
      console.log("Error while getting album from firebase: ", err);
    }
  };

  useEffect(() => {
    getAlbum();
  }, []);

  useEffect(() => {
    getAlbum();
  }, [albumsData, albumInput]);

  return (
    <>
      <div className="container-album">
        {showAlbumForm && (
          <div className="album-input">
            <h1>Create an album</h1>
            <input
              type="text"
              placeholder="Album Name"
              value={albumInput}
              onChange={handleAlbumInput}
              required
            />
            <button id="clear" onClick={clearAlbumInput}>
              Clear
            </button>
            <button id="create" onClick={createAlbum}>
              Create
            </button>
          </div>
        )}
        <div className="title-album">
          <h1>Your albums</h1>
          {showBtn && (
            <button id="add-album" onClick={handleShowForm}>
              Add album
            </button>
          )}
          {showAlbumForm && (
            <button id="cancel" onClick={handleShowForm}>
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="album-container">
        {albumsData.map((album) => (
          <Album
            key={album.id}
            text={album.text}
            albumId={album.id}
            handleBackAndForward={handleBackAndForward}
          />
        ))}
      </div>
    </>
  );
};

export default AlbumForm;
