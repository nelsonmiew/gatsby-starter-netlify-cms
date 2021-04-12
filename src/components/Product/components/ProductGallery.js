import React, { Component } from "react";
import Slider from "react-slick";
import { GatsbyImage } from "gatsby-plugin-image";

export class ProductGallery extends Component {
  
  render() {
    const { images, altText } = this.props;

    const ArrowPrev = ({ currentSlide, slideCount, children, ...props }) => (
      <button {...props} aria-label="Prev" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.75 20.75">
          <g>
            <g>
              <path d="M11.65,6.55a.5.5,0,0,0-.71,0L7.56,10a.5.5,0,0,0,0,.7l3.38,3.38a.52.52,0,0,0,.71,0,.51.51,0,0,0,0-.71l-3-3,3-3.09A.5.5,0,0,0,11.65,6.55Z" />
              <path d="M10.38,0A10.38,10.38,0,1,0,20.75,10.38,10.38,10.38,0,0,0,10.38,0Zm0,20A9.63,9.63,0,1,1,20,10.38,9.64,9.64,0,0,1,10.38,20Z" />
            </g>
          </g>
        </svg>
      </button>
    );

    const ArrowNext = ({ currentSlide, slideCount, children, ...props }) => (
      <button {...props} aria-label="Next" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.75 20.75">
          <g>
            <g>
              <path d="M9.81,6.66a.5.5,0,0,0-.71.71l3,3-3,3.09a.5.5,0,0,0,0,.71.54.54,0,0,0,.35.14.51.51,0,0,0,.36-.15l3.38-3.45a.5.5,0,0,0,0-.7Z" />
              <path d="M10.38,0A10.38,10.38,0,1,0,20.75,10.38,10.38,10.38,0,0,0,10.38,0Zm0,20A9.63,9.63,0,1,1,20,10.38,9.64,9.64,0,0,1,10.38,20Z" />
            </g>
          </g>
        </svg>
      </button>
    );

    const settings = {
      dots: false,
      arrows: true,
      prevArrow: <ArrowPrev />,
      nextArrow: <ArrowNext />,
      infinite: false,
      lazyLoad: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 976,
          settings: {
            dots: false,
            infinite: true,
            arrows: true,
            centerMode: false,
            centerPadding: 0,
          },
        },
      ],
    };
    
    return (
      <Slider {...settings} ref={(slider) => (this.slider = slider)} className="">
        {images &&
          images.map((image, i) => (
            <div key={"product-img-" + image.id} className={"d-block slide cursor-pointer " + image.id}>
                <GatsbyImage
                 image={ image.childImageSharp.gatsbyImageData }                                 
                //  aspectRatio={ 37 / 24}
                 imgStyle={{ objectFit: "contain" }}
                 alt={altText}         
              />  
            </div>
          ))}
      </Slider>
    );
  }
}

export default ProductGallery;
