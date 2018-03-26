import React from 'react';
import axios from 'axios';

import Footer from 'components/Footer/Footer';
import GifList from 'components/GifList/GifList';
import Header from 'components/Header/Header';
import SearchSection from 'components/SearchSection/SearchSection';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      search: null,
      synonyms: []
    }
  }

  componentWillMount() {
    axios.get('/get').then(response => {
      this.setState({
        gifs: response.data
      });
    });
  }

  render() {
    const { gifs, synonyms } = this.state;

    return (
      <div className="page-wrapper">
        <Header />
        <SearchSection synonyms={synonyms} />
        <GifList gifs={gifs} />
        <Footer />
      </div>
    );
  }
}

export default App;
