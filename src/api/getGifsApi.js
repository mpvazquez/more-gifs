import request from 'axios';

import { API_LIMIT } from '../constants';

const getGifsApi = (search, offset) => {
  let url = `/get-gifs?limit=${API_LIMIT}`;

  if (offset) {
    url += `&offset=${offset}`;
  }

  if (search) {
    url += `&query=${search}`;
  }

  return request.get(url);
}

export default getGifsApi;
