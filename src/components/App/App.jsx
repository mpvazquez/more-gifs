import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Footer from 'components/Footer/Footer';
import GifList from 'components/GifList/GifList';
import Header from 'components/Header/Header';

import SearchHistoryList from 'components/SearchHistoryList/SearchHistoryList';
import SearchInput from 'components/SearchInput/SearchInput';
import SearchSynonymList from 'components/SearchSynonymList/SearchSynonymList';

import getGifsApi from '../../api/getGifsApi';
import getSynonymsApi from '../../api/getSynonymsApi';

import { API_LIMIT } from '../../constants';

import styles from './App.pcss';

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
    const { children, gifs, history, search, synonyms } = this.state;

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

          <button className={styles.loadMoreButton}
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
    getGifsApi(search, offset)
      .then(({ data }) => {
        const { gifs } = this.state;

        this.setState({
          gifs: gifs.concat(data)
        });
      });
  }

  getSynonyms = (search = '') => {
    getSynonymsApi(search)
      .then(({ data: synonyms }) => {
        this.setState({ synonyms });
      });
  }

  onClickTag = event => {
    event.preventDefault();

    const { search } = event.currentTarget.dataset;

    this.onSubmitSearch(search);
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
