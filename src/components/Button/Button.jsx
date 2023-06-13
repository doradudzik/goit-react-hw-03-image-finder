import css from './Button.module.css';
import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { loadMoreBtn } = this.props;
    return (
      <div className={css.buttonContainer}>
        <button className={css.button} onClick={loadMoreBtn}>
          Load more
        </button>
      </div>
    );
  }
}

export default Button;
