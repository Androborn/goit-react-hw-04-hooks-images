import { useState, useEffect, useCallback, useRef } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Searchbar, SearchForm, ImageGallery, Button, Modal } from './';
import { pixabayApiService } from '../utils';
import {
  notifySuccess,
  notifyWarning,
  notifyInfo,
  notifyError,
  Loader,
} from '../vendors';
import {
  Wrapper,
  PreSearchPlaceHolder,
  StyledToastContainer,
} from './App.styled';

export default function App() {
  const [fetchedImages, setFetchedImages] = useState(null);
  const [fetchQuery, setFetchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState({});
  const [loading, setLoading] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  const isFirstRender = useRef(true);

  const IMG_PER_PAGE = 12;

  const toggleLoadMoreBtn = useCallback(
    (IMG_PER_PAGE, totalFoundImagesQuantity) => {
      if (page >= totalFoundImagesQuantity / IMG_PER_PAGE) {
        notifyInfo('No more images to load by your request');
        return setShowLoadMoreBtn(false);
      } else {
        return setShowLoadMoreBtn(true);
      }
    },
    [page],
  );

  const receivedImages = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedData = await pixabayApiService(
        fetchQuery,
        page,
        IMG_PER_PAGE,
      );
      const { hits: newlyFetchedImages, totalHits: totalFoundImagesQuantity } =
        fetchedData;

      if (totalFoundImagesQuantity === 0) {
        return notifyWarning('Nothing found by your request');
      } else {
        if (page === 1) {
          notifySuccess(
            `${totalFoundImagesQuantity} images found by your request!`,
          );
        }
        toggleLoadMoreBtn(IMG_PER_PAGE, totalFoundImagesQuantity);
        return setFetchedImages(prevFetchedImages => {
          if (prevFetchedImages) {
            return [...prevFetchedImages, ...newlyFetchedImages];
          } else {
            return [...newlyFetchedImages];
          }
        });
      }
    } catch (error) {
      console.log(error);
      notifyError(
        `An error occured processing your request. Retry, or contact site Admin for "${error.message}" if repeats.`,
      );
    } finally {
      setLoading(false);
    }
  }, [fetchQuery, page, toggleLoadMoreBtn]);

  function recordFetchQuery(searchQuery) {
    if (searchQuery === fetchQuery) {
      return;
    } else {
      setFetchQuery(searchQuery);
      setInitialState();
    }
  }

  function setInitialState() {
    setFetchedImages(null);
    setPage(1);
  }

  function loadMoreImages() {
    setPage(prevPage => prevPage + 1);
  }

  function toggleModal() {
    setShowModal(showModal => !showModal);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      receivedImages();
    }
  }, [receivedImages]);

  useEffect(() => {
    if (page > 1) {
      return window.scrollBy({ top: 1000, behavior: 'smooth' });
    }
  }, [page, fetchedImages]);

  return (
    <>
      <Wrapper>
        <Searchbar>
          <SearchForm onSubmit={recordFetchQuery} />
        </Searchbar>
        {!fetchedImages && !loading ? (
          <PreSearchPlaceHolder>
            Search for the images you like by the key word.
          </PreSearchPlaceHolder>
        ) : (
          <ImageGallery
            fetchedImages={fetchedImages}
            onClick={(largeImageURL, previewURL) => {
              toggleModal();
              setModalImg({ largeImageURL, previewURL });
            }}
          />
        )}
        {loading && <Loader />}
        {showModal && (
          <Modal closeModal={toggleModal}>
            <LazyLoadImage
              src={modalImg.largeImageURL}
              alt="Enlarged"
              effect="blur"
              placeholderSrc={modalImg.previewURL}
            />
          </Modal>
        )}
      </Wrapper>
      {showLoadMoreBtn && !loading && (
        <Button onClick={loadMoreImages}>Load more</Button>
      )}
      <StyledToastContainer />
    </>
  );
}
