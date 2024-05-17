import ProductsCarousel from './carousel';
import { ProductLists } from 'types'; 

const ProductsFeatured = ({data}: {data:ProductLists}) => {
  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  )
};

export default ProductsFeatured