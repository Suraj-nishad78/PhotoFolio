import { useEffect, useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";

//Firebase method import here
import { db, albumRef } from "../../../config/firebaseinit";
import { getDocs, addDoc } from "firebase/firestore";

//Album List imported here
import AlbumList from "../album/AlbumList";

const AlbumForm = ({ handleBackAndForward }) => {

  //All state are decalre here
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [albumInput, setAlbumInput] = useState("");
  const [albumsData, setAlbumsData] = useState([]);
  const [loading, setLoading] = useState(false);

  //For show form code
  const handleShowForm = () => {
    setShowAlbumForm(!showAlbumForm);
    setShowBtn(!showBtn);
  };

  //hanlde input in album form
  const handleAlbumInput = (e) => {
    setAlbumInput(e.target.value);
  };

  //Create Album method here 
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
      getAlbum();
    } catch (error) {
      console.log("Error while creating album: ", error);
    }
  };

  //Clear input box
  const clearAlbumInput = () => {
    setAlbumInput("");
  };

  //Get Album from firebase
  const getAlbum = async () => {
    try {
      setLoading(true);
      let albums = await getDocs(albumRef);
      albums = albums.docs.map((album) => ({
        id: album.id,
        ...album.data(),
      }));
      setLoading(false);
      setAlbumsData(albums);
      return;
    } catch (err) {
      console.log("Error while getting album from firebase: ", err);
    }
  };

 //Side effect run on mount 
  useEffect(() => {
    getAlbum();
  }, []);

  return (
    <>
      <div className="container-album">
        {/* Album form code here  */}
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
      {/* Album List component here */}
      <div className="album-container">
        {loading ? 
        (
          // Spinner run on before data fetch
          <div className="spinner">
            <Spinner radius={30} color={"#333"} stroke={4} visible={true} />
          </div>
          ) : (
          albumsData.map((album) => (
            // Album List render 
            <AlbumList
              key={album.id}
              text={album.text}
              albumId={album.id}
              handleBackAndForward={handleBackAndForward}
            />
          ))
        )}
      </div>
    </>
  );
};

export default AlbumForm;
