import { useState,useEffect } from 'react'
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Image } from '../../types';


interface Error {
    message: string;
}


export default function App () {
  const[query, setQuery] = useState<string>("");
  const[images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

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

    const handleSearchSubmit = (searchQuery: string) => {
        setQuery(searchQuery);
        setPage(1);
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const openModal = (image: Image) => {
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