import React from 'react';
import axios from 'axios';

import Footer from 'components/Footer/Footer';
import GifList from 'components/GifList/GifList';
import Header from 'components/Header/Header';
import SearchSection from 'components/SearchSection/SearchSection';

import styles from './App.pcss';

const API_LIMIT = 25;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      offset: 0,
      search: null,
      synonyms: []
    }
  }

  componentDidMount() {
    axios.get('/get').then(response => {
      this.setState({
        gifs: response.data
      });
    });
  }

  render() {
    const { gifs, synonyms } = this.state;

    return (
      <div className={styles.pageWrapper}>
        <Header />
        <SearchSection synonyms={synonyms} />

        <div className="">
          <GifList gifs={gifs} />

          <button id="load-more-button"
            onClick={this.onLoadMoreClick}
          >
    				<span>MORE<i className="em em-mag_right"></i></span>
    			</button>
        </div>

        <Footer />
      </div>
    );
  }

  onLoadMoreClick = event => {
    event.preventDefault();

    const { search } = this.state;
    const offset = this.state.offset += API_LIMIT;

    this.setState({ offset });

    let url = '/get?offset=' + offset + '&limit=' + API_LIMIT;

    if (search) {
      url += '&query=' + search;
    }

    axios.get(url).then(response => {
      this.setState({
        gifs: this.state.gifs.concat(response.data)
      });
    });
  }
}

export default App;
