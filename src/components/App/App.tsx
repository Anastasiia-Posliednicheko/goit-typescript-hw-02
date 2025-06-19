import { useState,useEffect } from 'react'
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ImageModal from "./components/ImageModal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";






export default function App () {
  const[query, setQuery] = useState("");
  const[images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const accessKey = "k6f5b84iLkkM4WnOM-p0McDWOQ8O3JL8uXk7Xg6OWXM"; 

  useEffect(() => {
        if (!query) return;

        const fetchImages = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    "https://api.unsplash.com/search/photos",
                    {
                        params: { query, page, per_page: 12 },
                        headers: { Authorization: `Client-ID ${accessKey}` },
                    }
                );
                if (page === 1) {
                    setImages(response.data.results);
                } else {
                    setImages((prev) => [...prev, ...response.data.results]);
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [query, page]);

    const handleSearchSubmit = (searchQuery) => {
        setQuery(searchQuery);
        setPage(1);
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };




  return (
    <div>
      <Toaster/>
      <SearchBar onSubmit={handleSearchSubmit}/>
      {error && <ErrorMessage message={error} /> }
      {images.length > 0 && (
        <>
         <ImageGallery images={images} onImageClick={openModal} />
         {isLoading && <Loader />}
         <LoadMoreBtn onClick={handleLoadMore} />
        </>
      )}
      {isLoading && images.length === 0 && <Loader />}
      <ImageModal isOpen={showModal} onClose={closeModal} image={selectedImage} />
    </div>
  );
}