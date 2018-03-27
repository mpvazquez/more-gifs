import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import routes from './routes/index.jsx';

const router = (
  <Router>
    { routes }
  </Router>
)

ReactDOM.render(router, document.getElementById('root-container'));
