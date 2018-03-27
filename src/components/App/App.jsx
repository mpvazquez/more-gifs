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
      history: [],
      offset: 0,
      search: '',
      synonyms: []
    }
  }

  componentDidMount() {
    this.getGifs();
  }

  render() {
    const { gifs, history, search, synonyms } = this.state;

    return (
      <div className={styles.appContainer}>
        <Header />

        <SearchSection history={history}
          search={search}
          synonyms={synonyms}
          onSubmitSearch={this.onSubmitSearch}
        />

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

  getGifs = (search = '') => {
    const { offset } = this.state;

    let url = `/get-gifs?limit=${API_LIMIT}`;

    if (offset) {
      url += `&offset=${offset}`;
    }
    if (search) {
      url += `&query=${search}`;
    }

    axios.get(url).then(response => {
      this.setState({
        gifs: this.state.gifs.concat(response.data)
      });
    });
  }

  getSynonyms = (search = '') => {
    let url = `/get-synonyms?query=${search}`;

    axios.get(url).then(response => {
      this.setState({
        synonyms: response.data
      });
    });
  }

  onLoadMoreClick = event => {
    event.preventDefault();

    const offset = this.state.offset + API_LIMIT;

    this.setState({ offset });

    this.getGifs();
  }

  onSubmitSearch = search => {
    const { history: currentHistory } = this.state;
    let history = currentHistory;

    if (!history.includes(search)) {
      history.push(search);
    }

    this.setState({
      gifs: [],
      offset: 0,
      history,
      search
    });

    this.getGifs(search);
    this.getSynonyms(search);
  }
}

export default App;
