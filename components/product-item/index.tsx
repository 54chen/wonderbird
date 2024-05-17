import Link from 'next/link';
import { ProductTypeList } from 'types';

const ProductItem = ({ discount, images, id, name, price, currentPrice, category }: ProductTypeList) => {


  return (
    <div className="product-item">
      <div className="product__image">

        <Link href={`/product/${category}/${id}`}>
          <a>
            <img src={images ? images[0] : ''} alt="product" />
            {discount && 
              <span className="product__discount">{discount}%</span>
            }
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{name}</h3>
        <div className={"product__price " + (discount ? 'product__price--discount' : '')} >
          <h4>{ currentPrice }</h4>

          {discount &&  
            <span>{ price }</span>
          }
        </div>
      </div>
    </div>
  )
};


export default ProductItem