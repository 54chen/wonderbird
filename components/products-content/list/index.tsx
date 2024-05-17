import ProductItem from '../../product-item';
import ProductsLoading from './loading';
import { ProductLists, ProductTypeList } from 'types';

const ProductsContent = ({category, data}:{category: string, data: ProductLists}) => {
  return (
    <> 
    <div className="products-content__intro">
      <h2>{category} <span>({data.length})</span></h2>        
    </div>
      {!data && 
        <ProductsLoading />
      }

      {data &&
        <section className="products-list">
          {data.map((item: ProductTypeList)  => (
            <ProductItem 
              id={item.id} 
              name={item.name}
              price={item.price}
              color={item.color}
              currentPrice={item.currentPrice}
              key={item.id}
              images={item.images} 
              category={category}
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent