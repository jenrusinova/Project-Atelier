const axios = require('axios');
const gitToken = require('../config.js');


const getTotalReviews = (productId, page) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}&count=50&sort=relevant&page=${page}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      // console.log('response:', response.data.results.length);
      return response.data;
    })
    .catch((err) => {
      console.log('This is the getTotalReviews error: ', err);
    });
};
const updateHelpfulness = (reviewId) => {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/helpful`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      // console.log('updatehelpful response:', response);
      return response;
    })
    .catch((err) => {
      console.log('This is the updateHelpfulness error: ', err);
    });
};

const ratingOverview = (productId) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      // console.log('ratingOverview response:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.log('This is the ratingOverview error: ', err);
    });
};

module.exports = {
  getTotalReviews,
  updateHelpfulness,
  ratingOverview

};