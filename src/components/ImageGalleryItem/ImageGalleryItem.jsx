import css from './ImageGalleryItem.module.css';

import { Component } from 'react';

class ImageGalleryItem extends Component {
  handleClick = event => {
    event.preventDefault();
    const { largeImageURL, openModal } = this.props;
    openModal(event, largeImageURL);
  };

  render() {
    const { webformatURL, tags } = this.props;
    return (
      <li className={css.galleryItem}>
        <div className={css.galleryItem__card}>
          <img
            src={webformatURL}
            alt={tags}
            loading="lazy"
            onClick={this.handleClick}
          />
        </div>
      </li>
    );
  }
}

export default ImageGalleryItem;
