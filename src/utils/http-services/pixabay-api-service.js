const axios = require('axios');
const BASE_URL = 'https://pixabay.com';
const API_KEY = '24437506-2bd4a91f2d86307f94e472b85';
const IMG_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const AGE_FILTER = 'true';

export const pixabayApiService = (searchQuery, page, IMG_PER_PAGE) => {
  axios.defaults.baseURL = BASE_URL;
  return axios
    .get('api/', {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: IMG_TYPE,
        orientation: ORIENTATION,
        safesearch: AGE_FILTER,
        per_page: IMG_PER_PAGE,
        page: page,
      },
    })
    .then(({ data }) => {
      if (Array.isArray(data.hits)) {
        return data;
      } else {
        throw new Error('Search error');
      }
    });
};
