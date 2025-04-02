import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Components imported here
import Navbar from './components/navbar/Navbar'
import AlbumForm from './components/albumFom/AlbumForm'
import ImageForm from './components/imageForm/ImageForm'

function App() {
  const [showAlbum, setShowAlbum] = useState(true)
  const [showImage, setShowImage] = useState(false)
  const [currentAlbum, setCurrentAlbum] = useState('')
  const [albumId, setAlbumId] = useState('')

  const handleBackAndForward = (text, albumId) =>{
    setShowAlbum(!showAlbum)
    setShowImage(!showImage)
    setCurrentAlbum(text)
    setAlbumId(albumId)
  }

  return (
    <>
      <header>
          <Navbar />
          {showAlbum && <AlbumForm handleBackAndForward={handleBackAndForward}/>}
          {showImage && <ImageForm handleBackAndForward={handleBackAndForward} currentAlbum={currentAlbum} albumId={albumId}/> }
          <ToastContainer 
            position="top-right"
            autoClose={3000}  // Auto closes after 3 seconds
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="light" 
          />

      </header>
    </>
  )
}

export default App
