import { useState, useEffect } from "react";
import css from "./App.module.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import SearchBar from "./SearchBar/SearchBar";
import { getImages } from "./api/api";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAltText, setModalAltText] = useState("");

  const handleSubmit = (query) => {
    setImagesList([]);
    setSearchQuery(query);
  };

  const openModal = (url, alt) => {
    setIsOpen(true);
    setModalUrl(url);
    setModalAltText(alt);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalUrl("");
    setModalAltText("");
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const { results, total_pages: totalPages } = await getImages(
          searchQuery,
          page
        );

        setImagesList((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < totalPages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  return (
    <>
      {isLoading && <Loader />}
      <SearchBar onSubmit={handleSubmit} />
      {isError && <ErrorMessage />}
      {!searchQuery && !isLoading ? (
        <div className={css.useraMessage}>Start your search</div>
      ) : searchQuery && !imagesList.length && !isLoading ? (
        <div className={css.useraMessage}>Nothing found</div>
      ) : (
        <ImageGallery
          searchQuery={searchQuery}
          images={imagesList}
          openModal={openModal}
        />
      )}
      {isVisible && <LoadMoreBtn setPage={setPage} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        url={modalUrl}
        alt={modalAltText}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
