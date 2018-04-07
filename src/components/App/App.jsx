import React from 'react';

import Button from 'components/Button/Button';
import Footer from 'components/Footer/Footer';
import GifList from 'components/GifList/GifList';
import Header from 'components/Header/Header';

import SearchHistory from 'components/SearchHistory/SearchHistory';
import SearchInput from 'components/SearchInput/SearchInput';
import SearchSynonyms from 'components/SearchSynonyms/SearchSynonyms';

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
    const { gifs, history, search, synonyms } = this.state;

    return (
      <div className={styles.appContainer}>
        <Header />

        <section>
          <SearchInput onSubmitSearch={this.onSubmitSearch}
            search={search}
          />
          <SearchSynonyms synonyms={synonyms}
            onClickTag={this.onClickTag}
          />
          <SearchHistory history={history}
            onClickTag={this.onClickTag}
          />
        </section>

        <section>
          <GifList gifs={gifs} />

          <Button className={styles.loadMoreButton}
            icon="em-mag_right"
            iconPosition="right"
            label="MORE"
            onClick={this.onLoadMoreClick}
          />
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

    const { prop: search } = event.currentTarget.dataset;

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

    if (search) {
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
}

export default App;
