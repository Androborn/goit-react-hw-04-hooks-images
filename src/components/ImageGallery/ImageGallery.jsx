import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ fetchedImages, onClick }) => (
  <Gallery>
    {fetchedImages &&
      fetchedImages.map(({ id, largeImageURL, webformatURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            thumbImageUrl={webformatURL}
            onClick={() => {
              onClick(largeImageURL);
            }}
          ></ImageGalleryItem>
        );
      })}
  </Gallery>
);

ImageGallery.propTypes = {
  fetchedImages: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};
