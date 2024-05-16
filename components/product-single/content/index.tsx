
import { ProductType } from 'types';

type ProductContent = {
  product: ProductType;
}

const Content = ({ product }: ProductContent) => {
  
  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">Product ID:<br></br>{product.id}</h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product.name}</h2>

        <div className="product__prices">
          <h4>${ product.currentPrice }</h4>
          {product.discount &&
            <span>${ product.price }</span>
          }
        </div>
      </div>

      <div className="product-content__filters">
       
      { product.description }
        
      </div>
    </section>
  );
};
  
export default Content;
    