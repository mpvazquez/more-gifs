import React from 'react';
import axios from 'axios';

import Footer from 'components/Footer/Footer';
import GifList from 'components/GifList/GifList';
import Header from 'components/Header/Header';
import SearchSection from 'components/SearchSection/SearchSection';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      search: null
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
    return (
      <div className="page-wrapper">
        <Header />
        <SearchSection />
        <GifList gifs={this.state.gifs} />
        <Footer />
      </div>
    );
  }
}

export default Page;
