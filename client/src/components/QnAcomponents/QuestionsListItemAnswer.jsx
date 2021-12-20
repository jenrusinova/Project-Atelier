import React from 'react';
import axios from 'axios';

class QuestionsListItemAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.clickOnYes = this.clickOnYes.bind(this);
  }

  clickOnYes() {
  
    let answerId = this.props.answer.id;
    let productId = this.props.productId;

    //UPDATE ANSWER HELPFUL COUNTER
    var url = 'http://localhost:3000/qna/updateAnswerHelp';
    axios.put(url, {params: {answerId: answerId, productId: productId}})
      .then((response) => {
        this.props.update(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='answer-item'>
        <div className='answer-item-a-letter'><h2>A:{this.props.answer.body}</h2></div>
        <div className='answer-item-username'>By user {this.props.answer.answerer_name}</div><div className='answer-item-date'>{this.props.answer.date}</div>
        <div className='answer-item-photos'></div>
        <div className='answer-item-helpful-keyword'>Helpful?</div>
        <div className='answer-item-yes-button' onClick={()=>{this.clickOnYes();}}><u>Yes({this.props.answer.helpfulness})</u></div>
        <div className='answer-item-report-button'>Report</div>
      </div>
    );
  }
}

export default QuestionsListItemAnswer;