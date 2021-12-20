import React from 'react';

const StyleDropdown = (props) => {
  // console.log('dropdown props', props.displayedStyle.skus)
  var sizes = Object.values(props.displayedStyle.skus)
  // console.log('sizes', sizes)
  return (
    <div>
      <select name='Size' id='sizeSelector' defaultValue=''>
        <option value='SelectSize' >Select Size</option>
        {sizes.map((element, pos) => {
          return <option key={pos}>{element.size}</option>
        })}
      </select>
    </div>
  )
}

export default StyleDropdown;