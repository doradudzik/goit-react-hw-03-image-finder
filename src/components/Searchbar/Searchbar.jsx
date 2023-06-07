import css from './Searchbar.module.css';
import { Notify } from 'notiflix';
const { Component } = require('react');

class Searchbar extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    const input = evt.target.elements.searchInput.value;
    if (input === '') {
      Notify.warning('Please, fill the main field');
      return;
    }
    this.props.onSubmit(input);
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchInput"
          />
          <button type="submit" className={css.button}></button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
