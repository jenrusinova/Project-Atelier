import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.data.map((question, key) =>{
          return <QuestionsListItem
            question={question}
            key={key}
            name={this.props.name}
            productId={this.props.productId}
            update={this.props.update}
          />;
        })}
      </div>
    );
  }
}

export default QuestionsList;