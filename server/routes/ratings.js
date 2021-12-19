const ratingsRouter = require('express').Router();
const RatingApi = require('../RatingApi.js');

ratingsRouter.get('/', (req, res) => {
  res.end('RATINGS ROUTER');
});

ratingsRouter.get('/getReviews', async (req, res) => {
  let productId = req.query.Id;
  // console.log("server receive ID:", req.query.Id);
  let totalReviews = await RatingApi.getTotalReviews(productId, 1);
  let prevReviews = totalReviews.results.slice();
  var newReviews = [];
  let i = 2;
  while (prevReviews.length > 0) {
    let temp = await RatingApi.getTotalReviews(productId, i);
    prevReviews = temp.results.slice();
    if (prevReviews.length > 0) {
      newReviews.push(prevReviews.slice());
      i++;
    }
  }
  newReviews = newReviews.flat();
  let result = totalReviews.results.concat(newReviews);
  res.status(200).send(result);
});

ratingsRouter.post('/updateHelpfulness', async (req, res) => {
  // console.log("receive review ID:", req.body.reviewId);
  let productId = req.body.Id;
  let totalReviews = await RatingApi.updateHelpfulness(productId);
  res.status(204).end();
});

ratingsRouter.get('/ratingOverview', async (req, res) => {
  let productId = req.query.Id;
  let ratingOverview = await RatingApi.ratingOverview(productId);
  let ratingAverage = await averageRate(ratingOverview.ratings, ratingOverview.recommended);
  ratingOverview.ratings = ratingAverage[0];
  ratingOverview.recommended = ratingAverage[1];
  res.status(200).send(ratingOverview);
});

const averageRate = function(ratings, recommended) {
  let a = Object.keys(ratings);
  let b = Object.values(ratings);
  let totalRatePoint = 0;
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i ++) {
      totalRatePoint += a[i] * b[i];
    }
  }
  const totalRatings = Object.values(ratings).reduce((a, b) => Number(a) + Number(b));
  const averageValues = totalRatePoint / totalRatings;
  let numOfFalse = Number(recommended.false);
  let numOfTrue = Number(recommended.true);
  let percentageOfRecommended = Math.round((numOfTrue / (numOfTrue + numOfFalse)) * 100);
  return [averageValues.toFixed(1), percentageOfRecommended];
};

module.exports = ratingsRouter;