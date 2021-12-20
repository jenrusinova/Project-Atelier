import styled from 'styled-components';

export const ImgContainer = styled.div`
  border: 1px solid black;
  height: 200px;
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const DisplayImg = styled.img`
  max-height: 100%;
  max-width: 100%;

`
export const ThumbContainer = styled.div`
  display: flex;
  border: 1px solid black;
  height: 50px;
  width: 450px;
  align-items: center;
  justify-content: center;
`
export const ThumbImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`
export const DisplayedThumbImg = styled.img`
  max-height: 100%;
  max-width: 100%;
  border: 5px solid #555;
`

export const RightArrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 10px;
  transform: rotate(-45deg);
`
export const LeftArrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 10px;
  transform: rotate(135deg);
`