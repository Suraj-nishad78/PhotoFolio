import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { getDocs, query, where } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

//Components imported here
import Navbar from "./components/navbar/Navbar";
import AlbumForm from "./components/albumFom/AlbumForm";
import ImageForm from "./components/imageForm/ImageForm";
import { imageRef } from "../config/firebaseinit";

function App() {
  //All state declare here
  const [showAlbum, setShowAlbum] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [albumImage, setAlbumImage] = useState([]);
  const [loading, setLoading] = useState(false)

 //function to handle backward button 
  const handleBackAndForward = (text, albumId) => {
    setShowAlbum(!showAlbum);
    setShowImage(!showImage);
    setCurrentAlbum(text);
    setAlbumId(albumId);
    setAlbumImage([])
  };

 //get Image data based on album name 
  const getImageBYAlbum = async () => {
    try {
      setLoading(true)
      const q = query(imageRef, where("albumId", "==", albumId));
      const allImages = await getDocs(q);
      const imagesByAlbumId = allImages.docs.map((image) => ({
        id: image.id,
        ...image.data(),
      }));
      setLoading(false)
      setAlbumImage(imagesByAlbumId);
    } catch (err) {
      console.log("Error while getting album image: ", err);
    }
  };

 //side-effects 
  useEffect(() => {
    getImageBYAlbum();
  }, []);

  useEffect(() => {
    getImageBYAlbum();
  }, [albumId]);

  return (
    <>
      <header>
        {/* Navebar components */}
        <Navbar />

        {/* Album Compnent */}
        {showAlbum && <AlbumForm handleBackAndForward={handleBackAndForward} />}

        {/* Image Component */}
        {showImage && (
          <ImageForm
            handleBackAndForward={handleBackAndForward}
            loading={loading}
            currentAlbum={currentAlbum}
            albumId={albumId}
            albumImage={albumImage}
            getImageBYAlbum={getImageBYAlbum}
          />
        )}

        {/* Toaster Component */}
        <ToastContainer
          position="top-right"
          autoClose={3000} // Auto closes after 3 seconds
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </header>
    </>
  );
}

export default App;
