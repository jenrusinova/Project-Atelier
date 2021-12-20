import React from 'react';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import sampleData from '../../../../example/questions.js';
import axios from 'axios';

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isMoreQuestionsButtonShown: false,
      productName: 'This is not a name'
    };
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.search = this.search.bind(this);
    this.updateQuestionList = this.updateQuestionList.bind(this);
  }

  componentDidMount() {
    let productId = this.props.productId;
    //GET PRODUCT NAME BY ITS ID
    var url = 'http://localhost:3000/qna/getProductById';
    axios.get(url, {params: {id: productId}})
      .then((response) => {
        this.setState({
          productName: response.data.name
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    //GET QUESTIONS LIST BY PRODUCT ID
    var url = 'http://localhost:3000/qna/getQuestionsList';
    axios.get(url, {params: {id: productId}})
      .then((response) => {
        console.log('should be question list', response.data.results);
        var questionsToShow = response.data.results;
        if (questionsToShow.length > 2) {
          this.setState({
            isMoreQuestionsButtonShown: true
          });
        }
        questionsToShow = questionsToShow.slice(0, 2);
        this.setState({
          questions: questionsToShow
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showMoreQuestions() {
    //GET ALL QUESTIONS BY PRODUCT ID
    var url = 'http://localhost:3000/qna/getQuestionsList';
    axios.get(url, {params: {id: productId}})
      .then((response) => {
        this.setState({
          questions: response.data.results,
          isMoreQuestionsButtonShown: false
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateQuestionList(questions) {
   
    this.setState({
      questions: questions
    });
  }

  search(query, isSearchTriggered) {
    let productId = this.props.productId;

    //GET LIST OF ALL QUESTIONS BY PRODUCT ID
    var url = 'http://localhost:3000/qna/getQuestionsList';
    axios.get(url, {params: {id: productId}})
      .then((response) => {
        if (isSearchTriggered) {
          query = query.toLowerCase();
          console.log('received query', query);
          let questions = response.data.results;
          const filtered = questions.filter(item => item.question_body.toLowerCase().includes(query));
          console.log('filtered', filtered);
          //do not hiding questions if more than 2
          this.setState({
            questions: filtered
          });
        } else {
          console.log('search stopped');
          //render all the questions and hide the rest if more than 2
          var questionsToShow = response.data.results;
          if (questionsToShow.length > 2) {
            this.setState({
              isMoreQuestionsButtonShown: true
            });
          }
          questionsToShow = questionsToShow.slice(0, 2);
          this.setState({
            questions: questionsToShow
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let moreAnsweredQuestions;
    if (this.state.isMoreQuestionsButtonShown) {
      moreAnsweredQuestions = <MoreAnsweredQuestions click={this.showMoreQuestions}/>;
    } else {
      moreAnsweredQuestions = <div></div>;
    }
    return (
      <div>

        <div className='qna-component-name'><h1>Questions and Answers</h1></div>
        <SearchQuestions search={this.search}/>
        <QuestionsList data={this.state.questions} productId ={this.props.productId} update={this.updateQuestionList}/>
        <br />
        {moreAnsweredQuestions}
        <AddQuestion name = {this.state.productName}/>
      </div>

    );
  }
}

export default QnA;