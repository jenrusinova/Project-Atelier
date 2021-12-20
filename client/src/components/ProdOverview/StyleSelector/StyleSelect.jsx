import React from 'react';
import StyleBubble from './StyleSelectBubble.jsx';
import StyleDropdown from './StyleDropdowns.jsx';


const StyleSelector = (props) => {
  // console.log('style selector component props', props)
  return (
    <div className='styleSelector'>
      {props.data.results.map((element, pos) => {
        return <StyleBubble key={pos} style={element} updater={props.changeStyle} />;
      })}
      <StyleDropdown displayedStyle={props.displayedStyle}/>
    </div>
  )
}

export default StyleSelector;