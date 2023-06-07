import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Notify } from 'notiflix';
import Loader from './Loader/Loader';

axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';

export class App extends Component {
  state = {
    pictures: [],
    query: '',
    pageNumber: 1,
    isShown: 0,
    isLoading: false,
    totalHits: 0,
  };

  async componentDidMount() {
    await this.fetchPictures();
  }

  fetchPictures = async () => {
    const { query, pageNumber } = this.state;
    if (query === '') {
      this.setState({ pictures: [], isShown: 0 });
      return [];
    }
    try {
      this.setState({ isLoading: true });
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '34808365-79ec0dd825bcd7358497b4699',
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: pageNumber,
          per_page: 12,
        },
      });
      const newPictures = response.data.hits;
      const totalHits = response.data.totalHits;

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...newPictures],
        totalHits: totalHits,
        isShown: prevState.isShown + newPictures.length,
      }));
      return newPictures;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = async input => {
    this.setState(
      { query: input, pageNumber: 1, pictures: [], isShown: 0 },
      async () => {
        const newPictures = await this.fetchPictures();
        if (newPictures.length === 0 && this.state.pictures.length === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setState(prevState => ({
          isShown: prevState.isShown + newPictures.length,
        }));
      }
    );
  };

  loadMoreBtn = async () => {
    this.setState(
      prevState => ({
        pageNumber: prevState.pageNumber + 1,
      }),
      async () => {
        const newPictures = await this.fetchPictures();

        if (newPictures.length > 0) {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...newPictures],
            isShown: prevState.isShown + newPictures.length,
          }));
          console.log('loadmore', this.state);
        }
      }
    );
  };

  render() {
    const { pictures, isLoading, isShown, totalHits } = this.state;

    return (
      <>
        <div>
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
        <div>
          {pictures.length > 0 ? <ImageGallery pictures={pictures} /> : null}
        </div>
        <div>
          {pictures.length > 0 && isShown < totalHits ? (
            <Button loadMoreBtn={this.loadMoreBtn} />
          ) : null}
        </div>
        {isLoading && pictures.length > 0 && <Loader />}
      </>
    );
  }
}
