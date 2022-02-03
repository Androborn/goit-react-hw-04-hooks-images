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

  const receivedImages = useCallback(async () => {
    try {
      const newlyfetchedImages = await pixabayApiService(fetchQuery, page);

      if (Array.isArray(newlyfetchedImages)) {
        return setFetchedImages(prevFetchedImages => {
          if (prevFetchedImages) {
            return [...prevFetchedImages, ...newlyfetchedImages];
          }
          return [...newlyfetchedImages];
        });
      } else {
        throw new Error('Fetch try error');
      }
    } catch (error) {
      console.log(error);
      alert(
        `An error occured processing your request. Retry, or contact site Admin for "${error.message}" if repeats.`,
      );
    } finally {
      setLoading(false);
    }
  }, [fetchQuery, page]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setLoading(true);
    receivedImages();
  }, [receivedImages]);

  useEffect(() => {
    if (page > 1) {
      return window.scrollBy({ top: 1000, behavior: 'smooth' });
    }
  }, [page, fetchedImages]);

  function recordFetchQuery(searchQuery) {
    if (searchQuery === fetchQuery) {
      return;
    }
    setFetchQuery(searchQuery);
    setFetchedImages(null);
    setPage(1);
  }

  function loadMoreImages() {
    setPage(page + 1);
  }

  function toggleModal() {
    setShowModal(showModal => !showModal);
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
