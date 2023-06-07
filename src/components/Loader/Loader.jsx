import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';
const { Component } = require('react');

class Loader extends Component {
  render() {
    return (
      <div className={css.loaderBox}>
        <ColorRing
          visible={true}
          height="150"
          width="150"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={[
            '#ff0000',
            '#ffa500',
            '#ffff00',
            '#008000',
            '#0000ff',
            '#4b0082',
            '#ee82ee',
          ]}
        />
      </div>
    );
  }
}

export default Loader;
