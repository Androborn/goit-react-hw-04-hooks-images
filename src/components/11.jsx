import { Component } from 'react';

import { Searchbar, SearchForm, ImageGallery, Loader, Button, Modal } from './';
import { pixabayApiService } from '../utils';
import { Wrapper } from './App.styled';

export default class App extends Component {
  state = {
    fetchedImages: [],
    fetchQuery: '',
    page: 1,
    showModal: false,
    modalImg: '',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.fetchQuery !== this.state.fetchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
    if (prevState.fetchedImages.length > 0) {
      window.scrollBy({ top: 1000, behavior: 'smooth' });
      // !calculate positioning after scroll for precise positioning
    }
    return;
  }

  recordFetchQuery = searchQuery => {
    if (searchQuery === this.state.fetchQuery) {
      return;
    }
    this.setState({
      fetchQuery: searchQuery,
      fetchedImages: [],
      page: 1,
    });
  };

  fetchImages = async () => {
    const { fetchQuery, page, fetchedImages } = this.state;

    this.setState({
      loading: true,
    });

    try {
      const newlyfetchedImages = await pixabayApiService(fetchQuery, page);
      if (Array.isArray(newlyfetchedImages)) {
        this.setState({
          fetchedImages: [...fetchedImages, ...newlyfetchedImages],
        });
        return;
      } else {
        throw new Error('Fetch try error');
      }
    } catch (error) {
      console.log(error);
      alert(
        `An error occured processing your request. Retry, or contact site Admin for "${error.message}" if repeats.`,
      );
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  loadMoreImages = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalImg = largeImg => {
    this.setState(() => ({
      modalImg: largeImg,
    }));
  };

  render() {
    const { recordFetchQuery, loadMoreImages, toggleModal, setModalImg } = this;
    const { loading, fetchedImages, showModal, modalImg } = this.state;

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
        {fetchedImages.length > 0 && !loading && (
          <Button onClick={loadMoreImages}>Load more</Button>
        )}
      </>
    );
  }
}
