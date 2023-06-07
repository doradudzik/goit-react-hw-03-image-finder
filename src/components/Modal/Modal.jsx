import css from './Modal.module.css';
const { Component } = require('react');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalOnEsc);
  }

  closeModalOnClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  closeModalOnEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <div className={css.overlay} onClick={this.closeModalOnClick}>
        <div className={css.modal}>
          <img
            src={largeImageURL}
            alt={tags}
            loading="lazy"
            className={css.modalImg}
          />
        </div>
      </div>
    );
  }
}
export default Modal;
