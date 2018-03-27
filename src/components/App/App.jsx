import React from 'react';
import axios from 'axios';

import Footer from 'components/Footer/Footer';
import GifList from 'components/GifList/GifList';
import Header from 'components/Header/Header';

import SearchHistoryList from '../SearchHistoryList/SearchHistoryList';
import SearchInput from '../SearchInput/SearchInput';
import SearchSynonymList from '../SearchSynonymList/SearchSynonymList';

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

        <section>
          <SearchInput onSubmitSearch={this.onSubmitSearch}
            search={search}
          />
          <SearchSynonymList synonyms={synonyms}
            onClickTag={this.onClickTag}
          />
          <SearchHistoryList history={history}
            onClickTag={this.onClickTag}
          />
        </section>

        <section>
          <GifList gifs={gifs} />

          <button id="load-more-button"
            onClick={this.onLoadMoreClick}
          >
    				<span>MORE<i className="em em-mag_right"></i></span>
    			</button>
        </section>

        <Footer />
      </div>
    );
  }

  getGifs = (search = '', offset = 0) => {
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

  onClickTag = event => {
    event.preventDefault();

    const { search } = event.currentTarget.dataset;

    let { history } = this.state;

    if (!history.includes(search)) {
      history.push(search);
    }

    this.setState({
      gifs: [],
      offset: 0,
      history,
      search
    });

    this.getSynonyms(search);
    this.getGifs(search);
  }

  onLoadMoreClick = event => {
    event.preventDefault();

    const { offset: currentOffset, search } = this.state;
    const offset = currentOffset + API_LIMIT;

    this.setState({ offset });

    this.getGifs(search, offset);
  }

  onSubmitSearch = search => {
    let { history } = this.state;

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
