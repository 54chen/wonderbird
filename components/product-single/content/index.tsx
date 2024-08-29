
import { ProductType } from 'types';
import React, { useState } from 'react';

type ProductContent = {
  product: ProductType;
}

const Content = ({ product }: ProductContent) => {
  const [price, setPrice] = useState(product.price);
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    // setSelectedCategory(selected);
    const category = product.price2?.find((cat) => cat.category === selected);
    if (category) {
      setPrice(category.price);
    } else {
      setPrice(product.price2?.[0].price || product.price);
    }
  };
  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">Product ID:<br></br>{product.id}</h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product.name}</h2>

        <div className="product__prices">
          <h4>{ price }</h4>
          {product.discount &&
            <span>{ product.price }</span> 
          } 
        </div>
        {product.price2 &&
        <><br/><label htmlFor="category-select">Select Category:</label>&nbsp;
        <select id="category-select" onChange={handleCategoryChange}>
          <option value="">--Please choose an option--</option>
          {product.price2.map((cat) => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select></>
        }
      </div>

      <div className="product-content__filters">
      <p dangerouslySetInnerHTML={{ __html: product.description.replaceAll('/n', '<br/><br/>') }}></p>        
      </div>
    </section>
  );
};
  
export default Content;
    