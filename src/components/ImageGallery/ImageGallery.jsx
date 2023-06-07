import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    selectedImage: null,
  };

  openModal = (event, largeImageURL) => {
    event.preventDefault();
    this.setState({ selectedImage: largeImageURL });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { pictures } = this.props;
    const { selectedImage } = this.state;

    const Gallery = ({ pictures }) => (
      <ul className={css.gallery}>
        {pictures.map(({ webformatURL, largeImageURL, tags }) => {
          const elementId = nanoid();

          return (
            <ImageGalleryItem
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              key={elementId}
              openModal={this.openModal}
            />
          );
        })}
      </ul>
    );

    return (
      <div>
        <Gallery pictures={pictures} />
        {selectedImage && (
          <Modal
            largeImageURL={selectedImage}
            tags={selectedImage}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;
