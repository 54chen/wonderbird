import { ProductLists } from 'types';
import List from './list';

const ProductsContent = ({category="", data}: { category:string, data:ProductLists }) => {  
  return (
    <section className="products-content">
      <List category={category} data={data} />
    </section>
  );
};
  
export default ProductsContent
  