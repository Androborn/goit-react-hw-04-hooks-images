import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, onClick, thumbImageUrl }) => (
  <GalleryItem key={id} onClick={onClick}>
    <GalleryItemImg src={thumbImageUrl} alt="Found image" />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  thumbImageUrl: PropTypes.string.isRequired,
};
