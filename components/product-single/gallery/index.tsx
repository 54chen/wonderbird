import React, { useState } from 'react';

type GalleryProductType = {
  images: string[]
}

const Gallery = ({ images }: GalleryProductType) => {
  const featImage = images[0];
  const [imageUrl, setImageUrl] = useState(images[0]);

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map(image => (
          <div key={image} className="product-gallery__thumb">
            <img src={image} alt="" onClick={()=>{setImageUrl(image)}}/>
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        <img src={imageUrl} alt="" />
      </div>
    </section>
  );
};
  
export default Gallery;
  