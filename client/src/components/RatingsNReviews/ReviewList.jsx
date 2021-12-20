import React, {useState, useEffect} from 'react';
import RatingBreakDown from './RatingBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import axios from 'axios';
import HelpfulButton from './HelpfulButton.jsx';

const ReviewList = ( {productId} )=>{
  const [selectedArray, setSelectedArray] = useState('totalReviewArray');
  const [isOpen, setIsOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);
  const [isExtended, setExtended] = useState('Show More');
  const [totalReviewArray, setTotalReviewArray] = useState([]);
  const [helpfulReviewArray, setHelpfulReviewArray] = useState([]);
  const [newestReviewArray, setNewestReviewArray] = useState([]);
  const [onScreenReviewArray, setOnScreenReviewArray] = useState([]);
  const [clickedList, setClickedList] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [averageRate, setAverageRate] = useState(0);
  const [recommended, setRecommended] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [fiveStar, setFiveStar] = useState(0);
  const [filter, setFilter] = useState(new Array(5).fill(null));
  const [sortedArray, setSortedArray] = useState([]);
  const [reset, setReset] = useState(false);
  const [count, setCount] = useState(0);
  const arrayMap =
   { totalReviewArray: totalReviewArray,
     helpfulReviewArray: helpfulReviewArray,
     newestReviewArray: newestReviewArray,
     sortedArray: sortedArray
   };
  useEffect(() => {
    setIsLoading(true);
    setSortedArray([]);
    setFilter(new Array(5).fill(null));
    axios.get('http://localhost:3000/ratings/getReviews', { params: { Id: productId } })
      .then((response)=>{
        const sortByRevelant = response.data.slice(0).sort((x, y) => { return y.helpfulness - x.helpfulness || y.review_id - x.review_id; });
        const firstTwo = sortByRevelant.slice(0, 2);
        if (selectedArray === 'restArray') {
          setOnScreenReviewArray(sortByRevelant);
          setIsLoading(false);
        }
        if (selectedArray === 'totalReviewArray') {
          setOnScreenReviewArray(firstTwo);
          setIsLoading(false);
        } else if (selectedArray === 'newestReviewArray') {
          setOnScreenReviewArray(response.data.slice(0).sort((x, y)=>{ return y.review_id - x.review_id; }).slice(0, 2));
          setIsLoading(false);
        } else if ( selectedArray === 'helpfulReviewArray') {
          setOnScreenReviewArray(response.data.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }).slice(0, 2));
          setIsLoading(false);
        }
        setTotalReviewArray(sortByRevelant);
        setNewestReviewArray(response.data.slice(0).sort((x, y)=>{ return y.review_id - x.review_id; }));
        setHelpfulReviewArray(response.data.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }));
        axios.get('http://localhost:3000/ratings/ratingOverview', { params: { Id: productId } })
          .then((response)=>{
            setAverageRate(response.data.ratings.average);
            setRecommended(response.data.recommended);
            setOneStar(response.data.ratings['1']);
            setTwoStar(response.data.ratings['2']);
            setThreeStar(response.data.ratings['3']);
            setFourStar(response.data.ratings['4']);
            setFiveStar(response.data.ratings['5']);
          });
      })
      .catch((err) => {
        console.log('this is the react reviewlist get reviews err', err);
      });
  }, [productId, selectedArray]);
  useEffect(() => {
    let currentFiler = sortFilter();
    if (currentFiler.length) {
      setOnScreenReviewArray(currentFiler.slice(0, 2));
      if (selectedArray === 'totalReviewArray') {
        setSortedArray(currentFiler.slice());
      } else if (selectedArray === 'helpfulReviewArray') {
        setSortedArray(currentFiler.slice());
      } else if (selectedArray === 'newestReviewArray') {
        setSortedArray(currentFiler.slice());
      }
    } else if (reset) {
      setSortedArray([]);
      setOnScreenReviewArray(totalReviewArray.slice(0, 2));
    }


  }, [filter]);
  const resetFilter = function () {
    if (sortedArray.length) {
      setReset(true);
      setFilter(new Array(5).fill(null));
      let dropDownList = document.getElementById('review-sort-select');
      setSelectedArray('totalReviewArray');
      dropDownList.value = 'totalReviewArray';
    }
    return;
  };
  const sortFilter = function () {
    let currentFiler = [];
    let count = 0;
    for (let i = filter.length - 1; i >= 0; i--) {
      if (filter[i] !== null) {
        count++;
        currentFiler = currentFiler.concat(filter[i]);
      }
    }
    setCount(count);
    return currentFiler;
  };
  const filterOnClicked = function (e) {
    let onClickedFilter = e.target.id;
    let updatedFilter = [...filter];
    if (onClickedFilter === 'fiveStar') {
      if (filter[4] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('restArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[4] = null;
      } else {
        let fiveStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 5; });
        updatedFilter[4] = fiveStarOnly;
      }
      setFilter(updatedFilter);
    } else if (onClickedFilter === 'fourStar') {
      if (filter[3] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('restArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[3] = null;
      } else {
        let fourStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 4; });
        updatedFilter[3] = fourStarOnly;
      }
      setFilter(updatedFilter);
    } else if (onClickedFilter === 'threeStar') {
      if (filter[2] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('restArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[2] = null;
      } else {
        let threeStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 3; });
        updatedFilter[2] = threeStarOnly;
      }
      setFilter(updatedFilter);
    } else if (onClickedFilter === 'twoStar') {
      if (filter[1] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('restArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[1] = null;
      } else {
        let twoStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 2; });
        updatedFilter[1] = twoStarOnly;
      }
      setFilter(updatedFilter);
    } else if (onClickedFilter === 'oneStar') {
      if (filter[0] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('restArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[0] = null;
      } else {
        let oneStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 1; });
        updatedFilter[0] = oneStarOnly;
      }
      setFilter(updatedFilter);
    }
  };
  const convertDate = function (dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const toggleIsTruncated = function () {
    setIsTruncated(isTruncated === true ? false : true);
    setExtended (isExtended === 'Show Less' ? 'Show More' : 'Show Less');
  };
  const loadReviews = function (selectedArray) {
    selectedArray = (sortedArray.length ? sortedArray : arrayMap[selectedArray]);
    let startIndex = onScreenReviewArray.length;
    for (let i = startIndex; i <= startIndex + 1; i++) {
      if (i === selectedArray.length) {
        break;
      } else {
        setOnScreenReviewArray((prevState) => {
          return prevState.concat(selectedArray[i]);
        });
      }
    }
  };
  const openModal = function (e) {
    var modal = document.getElementById('review-Modal');
    var img = document.getElementById('review-Images');
    var modalImg = document.getElementById('review-Modal-Content');
    modal.style.display = 'block';
    modalImg.src = e.target.src;
    modalImg.alt = e.target.alt;
  };
  const closeModal = function (e) {
    var modal = document.getElementById('review-Modal');
    modal.style.display = 'none';
  };
  const starWidth = function (rating) {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = (starPercentage / 10) * 10 + '%';
    return starPercentageRounded;
  };
  const dropDownMenu = function (e) {
    setSelectedArray(e.target.value);
    if (e.target.value === 'newestReviewArray') {
      setOnScreenReviewArray(newestReviewArray.slice(0, 2));
    } else if (e.target.value === 'totalReviewArray') {
      setOnScreenReviewArray(totalReviewArray.slice(0, 2));
    } else if (e.target.value === 'helpfulReviewArray') {
      setOnScreenReviewArray(helpfulReviewArray.slice(0, 2));
    }
  };
  const markClicked = function (id, helpfulness) {
    setClickedList(prevState => prevState.set( id, helpfulness ));
  };
  return (
    <div>
      <div className= 'review-starSection'>
        <RatingBreakDown resetFilter={resetFilter} filter={filter} filterOnClicked={filterOnClicked} oneStar={oneStar} twoStar={twoStar} threeStar={threeStar} fourStar={fourStar} fiveStar={fiveStar} recommended={recommended} starWidth={starWidth} averageRate={averageRate} productId= {productId}/>
        <ProductBreakDown />
      </div>
      <div className="review-Section">
        <div className="review-DropDown">
          <h2 style= {{display: 'inline'}}>{sortedArray.length ? sortedArray.length : totalReviewArray.length} reviews, sorted by </h2>
          <select onChange={dropDownMenu} id="review-sort-select">
            <option value="totalReviewArray">Relevant</option>
            <option value="newestReviewArray">Newest</option>
            <option value="helpfulReviewArray">Helpful</option>
          </select>
        </div>
        <div className= "review-List">
          {isLoading === true ? <h1 style = {{color: 'red'}}>Loading</h1> : onScreenReviewArray.map((user, index)=>{
            return (
              <div key={index} className="review-Cell">
                <div className="review-Top">
                  <div className="review-stars-outer">
                    <div className="review-stars-inner" style={{width: starWidth(user.rating)}}></div>
                  </div>
                  <span className="number-Rating" style= {{color: 'red'}}>{user.rating}</span>
                  <span className="nameAndDate">{user.reviewer_name}, {convertDate(user.date)}</span>
                </div>
                <h2 className="Summary">{user.summary.slice(0, 60)}</h2>
                <div className="review-Body"> {user.summary.length > 60 ?
                  <div className="extended-Summary">{user.summary.slice(60)}</div> : null} <br></br>{user.body.length > 250 ?
                  <div>{isTruncated ? <div >{user.body.substring(0, 250)}.........................</div> : <div>{user.body}</div>}
                    <div><button onClick = {()=>{ toggleIsTruncated(); }}>{isExtended}</button></div> </div> : <div>{user.body}</div>}
                </div>
                {user.photos.length > 0 ?
                  <div className="review-ImageSection">
                    {user.photos.map((img, index)=>{
                      return (
                        <div key = {index} className="review-Imageblock">
                          <img onClick={openModal} id="review-Images" alt = "user's review image" className = "review-Images" src= {img.url} />
                          <div id="review-Modal" className="review-Modal">
                            <span className="review-Modal-Close" onClick= {closeModal}>&times;</span>
                            <img className="review-Modal-Content" id="review-Modal-Content" />
                          </div>
                        </div>);
                    })}
                  </div> : null}
                {user.recommend ? <div><span>✔</span><span>I recommend this product</span></div> : null}
                {user.response ? (<div className="review-Response"><div className="seller-Response">Response from seller:</div> <div className="seller-Response2">{user.response}</div> </div>) : null}
                <HelpfulButton clickedList={clickedList} markClicked={markClicked} helpfulness={user.helpfulness} reviewId = {user.review_id}/>
              </div>
            );
          })}
        </div>
        <div className='review-Button'>{ isLoading ? null : onScreenReviewArray.length === (sortedArray.length ? sortedArray.length : totalReviewArray.length) || totalReviewArray.length < 2 ? null : <div><button onClick= {()=>{ loadReviews(selectedArray); }}>More reviews</button></div>}</div>
      </div>
    </div>
  );
};

export default ReviewList;
