import React from 'react';
import styled from 'styled-components';
import { ImgContainer, DisplayImg, ThumbContainer, ThumbImg,
  DisplayedThumbImg, RightArrow, LeftArrow } from './ImageGal.styles.js'

const DefaultGallery = (props) => {
  console.log('gallery props', props)
  const imgUrl = props.displayStyleImg
  const thumbArr = props.displayStyleThumbs

  const newDisplay = (e) => {
    console.log(e.value)
  }

  return (
    <div className='imageGallery'>
      <ImgContainer className='mainImage'>
        <LeftArrow className='leftArrow'></LeftArrow>
        <DisplayImg src={imgUrl} />
        <RightArrow className='arrowRight'></RightArrow>
      </ImgContainer>
      <ThumbContainer className='thumbnails'>
        {thumbArr.map((element, pos) => {
          if (imgUrl === element.url) {
            return <DisplayedThumbImg key={pos} src={element.thumbnail_url} onClick={() => {props.thumbToDisp(element.url)}} />
          } else {
            return <ThumbImg key={pos} src={element.thumbnail_url} onClick={() => {props.thumbToDisp(element.url)}} />
          }
        })}
      </ThumbContainer>
    </div>
  )
}



export default DefaultGallery;