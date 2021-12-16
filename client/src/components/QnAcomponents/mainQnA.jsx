import React from 'react';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import sampleData from '../../../../example/questions.js';

class QnA extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      product_name:'Random hoodie'
    }
  }

  render(){
    return(
      <div>
      <div className='qna-component-name'>Questions and Answers</div>
      <SearchQuestions />
      <QuestionsList data={sampleData}/>
      <MoreAnsweredQuestions />
      <AddQuestion name={this.state.product_name}/>
      </div>

    )
  }
}

export default QnA;