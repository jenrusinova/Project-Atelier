import React from 'react';

class AddQuestionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questionBody:'',
      nickname:'',
      email:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    console.log('pressed submit');
    console.log(this.state);
  }


  render(){
    return(
      <div>
        <div className = 'qna-add-question-main-title'>Ask a question</div>
          <div className ='qna-add-question-subtitle'>About the hardcoded product name</div>
          <form>
            <label>
              Your question*
              <input
                name='questionBody'
                type='text'
                value={this.state.questionBody}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              What's your nickname?*
              <input
                name='nickname'
                type='text'
                placeholder='Example: jackson11'
                value={this.state.nickname}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Your email?*
              <input
                name='email'
                type='text'
                placeholder='Example: sample@email.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
            <input type="submit" value="Submit" onClick = {(e)=>this.handleSubmit(e)} />
          </form>
      </div>
    )
  }
}

export default AddQuestionForm;