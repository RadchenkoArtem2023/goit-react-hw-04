import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const perPage = 12;
  const accessKey = "Q2ytRwwV14fJQSU6srvb4hz1Fvtetphkw3T7S_n_IzE";

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${accessKey}`
        );

        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }
      } catch (err) {
        setError("Failed to fetch images. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
