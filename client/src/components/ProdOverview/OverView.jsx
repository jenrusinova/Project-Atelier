import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector/StyleSelect.jsx';
import AddToCart from './AddToCart.jsx';
import DefaultGallery from './ImageGallery/DefaultGal.jsx';
import sampleData from '../../../../example/products.js'

class ProductOverview extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      products: sampleData.products,
      styles: sampleData.style,
      mainProduct: sampleData.specificProduct,
      displayStyle: sampleData.style.results[0],
      displayStyleImg: sampleData.style.results[0].photos[0].url,
      displayStyleThumbs: sampleData.style.results[0].photos
    };
    this.updateStyle = this.updateStyle.bind(this)
  }

  componentDidMount(){};

  updateStyle(selectedStyle) {
    this.setState({
      displayStyle: selectedStyle,
      displayStyleImg: selectedStyle.photos,
    })
  }

  thumbToDisp(selectedImg) {
    this.setState({
      displayStyleImg: selectedImg
    })
  }

  render () {
    console.log('state', this.state)
    return (
      <div className='overview'>
        <ProductInfo data={this.state.products[0]} />
        <StyleSelector data={this.state.styles} displayedStyle={this.state.displayStyle}
        changeStyle={this.updateStyle} />
        <AddToCart />
        <DefaultGallery displayedStyle={this.state.displayStyle} displayStyleImg={this.state.displayStyleImg}
        displayStyleThumbs={this.state.displayStyleThumbs} thumbToDisp={this.thumbToDisp.bind(this)} />
      </div>
    );
  }
}

export default ProductOverview;