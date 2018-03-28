import request from 'axios';

const getSynonymsApi = search => {
  let url = `/get-synonyms?query=${search}`;

  return request.get(url);
}

export default getSynonymsApi;
