import { useState, useEffect } from "react";
import css from "./App.module.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { getImages } from "./components/api/api";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

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
    setPage(1);
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
