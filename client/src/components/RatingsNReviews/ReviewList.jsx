import React, {useState, useEffect} from "react";
import axios from 'axios';
import Sample from '/home/yanlin/hackreactor/Project-Atelier/example/reviews.js'
const ReviewList = ()=>{

  let result = Sample.reviews.results;
  const [isOpen, setIsOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true)
  const [isExtended, setExtended] = useState("Show More")
  const [totalReviewArray, setTotalReviewArray] = useState([]);
  const [onScreenReviewArray, setOnScreenReviewArray] = useState([])
  // const [totalReviewArray, setTotalReviewArray] = useState(result);
  // const [onScreenReviewArray, setOnScreenReviewArray] = useState(totalReviewArray.slice(0,2))

  console.log(totalReviewArray)
  console.log(onScreenReviewArray.length)
  useEffect(() => {
    axios.get('http://localhost:3000/getReviews')
    .then((response)=>{
      console.log(response.data.results);
      setTotalReviewArray(response.data.results.slice(0))
      setOnScreenReviewArray(response.data.results.slice(0,2))
    })
    .catch((err) => {
      console.log("this is the react getreviews err",err);
    })
  }, [])


  function convertDate(dateString){
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  function toggleIsTruncated () {
    console.log("toggling");
    setIsTruncated(isTruncated === true ? false : true);
    setExtended (isExtended === "Show Less" ? "Show More" : "Show Less")
  }
  function loadReviews() {
    console.log("loading more reviews")
    let startIndex = onScreenReviewArray.length;
    console.log("start:", startIndex)
    for(let i = startIndex; i <= startIndex+1; i++) {
      if(i === totalReviewArray.length) {
        console.log("break")
        break;
      } else {
        setOnScreenReviewArray((prev) => {
          return prev.concat(totalReviewArray[i])
        })
      }

    }
    console.log("currentOnscreen",onScreenReviewArray)
  }
  function openModal(e) {
    var modal = document.getElementById('myModal');
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = e.target.src;
    modalImg.alt = e.target.alt;
  }
  function closeModal(e) {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  }
  function starWidth (rating) {
    const starsTotal = 5
    const starPercentage = (rating/starsTotal) * 100;
    // const starPercentageRounded = Math.round(starPercentage / 10) * 10 + "%"
    const starPercentageRounded = (starPercentage / 10) * 10 + "%"
    // console.log(starPercentageRounded);
    return starPercentageRounded;
  }
  function helpfulButton (e) {
    console.log("review ID on clicked:", e.target)
    e.target.className += " onClicked"
    const voteCount = document.getElementById(e.target.id-1);
    // console.log(voteCount.innerText);
    const voteIncrement = parseInt(voteCount.innerText[1]) + 1;
    // console.log(voteIncrement)
    voteCount.innerText = "(" + voteIncrement + ")"
    axios.post('http://localhost:3000/updateHelpfulness', {reviewId: e.target.id})
    .then((response)=>{
      console.log("helpfulButton response:", response)
    })
    .catch((err) => {
      console.log("this is the react updateHelpfulness err",err);
    })
  }
  return (
    <div className="reviewSection">
      <h1>This is the reviewList</h1>
     <div className="reviewList">{onScreenReviewArray.length === 0 ? <h1 style = {{color:"red"}}>No reviews yet</h1> :  onScreenReviewArray.map((user,index)=>{
        return (
          <div key={index} className="reviewCell">
            <div className="reviewTop">
              <div className="stars-outer">
                <div className="stars-inner" style={{width:starWidth(user.rating)}}></div>
              </div>
              <span className="number-Rating" style= {{color:"red"}}>{user.rating}</span>
              <span className="nameAndDate">{user.reviewer_name}, {convertDate(user.date)}</span>
            </div>
            <h2 className="Summary">{user.summary.slice(0,60)}</h2>
            <div className="review-Body"> {user.summary.length > 60 ?
              <div className="extended-Summary">{user.summary.slice(60)}</div>: null} <br></br>{user.body.length > 250 ?
              <div>{isTruncated ? <div >{user.body.substring(0,250)}.........................</div> :<div>{user.body}</div>}
              <div><button onClick = {()=>{toggleIsTruncated()}}>{isExtended}</button></div> </div>: <div>{user.body}</div>}
            </div>
            {user.photos.length > 0 ?
            <div className="review-ImageSection">
            {user.photos.map((img, index)=>{
              return (
              <div key = {index} className="Imageblock">
                <img onClick={openModal} id="myImg" alt = "user's review image" className = "review-Images" src= {img.url} />
                <div id="myModal" className="modal">
                  <span className="close" onClick= {closeModal}>&times;</span>
                  <img className="modal-content" id="img01" />
                </div>
              </div>)
            })}
            </div>: null}
            {user.recommend ? <div><span>✔</span><span>I recommend this product</span></div> : null}
            {user.response ? (<div className="review-Response"><div className="seller-Response">Response from seller:</div> <div className="seller-Response2">{user.response}</div> </div>) : null}
            <div><span>Helpful? </span><span onClick={helpfulButton} className="helpful-1" id= {user.review_id}>Yes</span><span className="helpful-2" id={user.review_id-1}>({user.helpfulness}) </span><span> | Report</span></div>
          </div>
        )
      })}
      </div>

      {onScreenReviewArray.length === totalReviewArray.length || totalReviewArray.length < 2 ? null : <div><button onClick= {()=>{loadReviews()}}>More reviews</button></div>}
    </div>
  )
}

export default ReviewList;