import React from 'react';
import AddQuestionForm from './AddQuestionForm.jsx';

class AddQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isModalShown: false,
      isAddButtonShown: true,
      product_id: 1
    }
    this.clickOnAddQuestion = this.clickOnAddQuestion.bind(this);
  }

  clickOnAddQuestion(){
    this.setState({
      isModalShown: true,
      isAddButtonShown: false
    })
  }


  render(){
    let modal;
    let questionButton;
    if(this.state.isModalShown){
      modal = <div><AddQuestionForm name={this.props.name}/></div>
    } else {
      modal = <div></div>
    }
    if(this.state.isAddButtonShown){
      questionButton =  <button onClick={()=>this.clickOnAddQuestion()}>Add a new question</button>
    } else {
      questionButton = <div></div>
    }
    return(
      <div>
        {questionButton}
        {modal}
      </div>
    )
  }
}

export default AddQuestion;