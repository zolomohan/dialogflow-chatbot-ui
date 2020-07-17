import React from 'react';

export default function Carousel({ carousel }) {
  // console.log(text, subtitle)
  return (
    <div className='card mt-2' style={{ width: '18rem' }}>
      <img className='card-img-top' src={carousel.image.stringValue} alt='Card image cap' />
      <div className='card-body bg-dark'>
        <h5 className='card-title'>{carousel.title.stringValue}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{carousel.subtitle.stringValue}</h6>
        <p className='card-text'>{carousel.description.stringValue}</p>
        <a href='#' className='btn btn-primary'>
          {carousel.buttonText.stringValue}
        </a>
      </div>
    </div>
  );
}
