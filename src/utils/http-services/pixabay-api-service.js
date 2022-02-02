const axios = require('axios');
const BASE_URL = 'https://pixabay.com';
const API_KEY = '24437506-2bd4a91f2d86307f94e472b85';
const IMG_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const AGE_FILTER = 'true';
const IMG_PER_PAGE = 12;

// re-do to try-catch
export const pixabayApiService = (searchQuery, page) => {
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
      return data.hits;
    });
};
