import { useState, useEffect, useCallback, useRef } from 'react';

import { Searchbar, SearchForm, ImageGallery, Loader, Button, Modal } from './';
import { pixabayApiService } from '../utils';
import { Wrapper } from './App.styled';

export default function App() {
  const [fetchedImages, setFetchedImages] = useState(null);
  const [fetchQuery, setFetchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  console.log(fetchedImages);
  console.log(fetchQuery);
  console.log(page);

  const receivedImages = useCallback(async () => {
    const newlyfetchedImages = await pixabayApiService(fetchQuery, page);
    if (Array.isArray(newlyfetchedImages)) {
      setFetchedImages(() => {
        if (fetchedImages) {
          return [...fetchedImages, ...newlyfetchedImages];
        }
        return [...newlyfetchedImages];
      });
      if (fetchedImages) {
        window.scrollBy({ top: 1000, behavior: 'smooth' });
      }
    } else {
      throw new Error('Fetch try error');
    }
  }, [fetchQuery, fetchedImages, page]);

  useEffect(() => {
    return async () => {
      try {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }
        setLoading(true);
        receivedImages();
      } catch (error) {
        console.log(error);
        alert(
          `An error occured processing your request. Retry, or contact site Admin for "${error.message}" if repeats.`,
        );
      } finally {
        setLoading(false);
      }
    };
  }, [receivedImages]);

  function recordFetchQuery(searchQuery) {
    if (searchQuery === fetchQuery) {
      return;
    }
    setFetchQuery(searchQuery);
    // setFetchedImages([]);
    setPage(1);
  }

  function loadMoreImages() {
    setPage(page + 1);
  }

  function toggleModal() {
    setShowModal(({ showModal }) => !showModal);
  }

  return (
    <>
      <Wrapper>
        <Searchbar>
          <SearchForm onSubmit={recordFetchQuery} />
        </Searchbar>
        <ImageGallery
          fetchedImages={fetchedImages}
          onClick={largeImageURL => {
            toggleModal();
            setModalImg(largeImageURL);
          }}
        />
        {loading && <Loader />}
        {showModal && (
          <Modal closeModal={toggleModal}>
            <img src={modalImg} alt="Enlarged" />
          </Modal>
        )}
      </Wrapper>
      {fetchedImages && !loading && (
        <Button onClick={loadMoreImages}>Load more</Button>
      )}
    </>
  );
}
