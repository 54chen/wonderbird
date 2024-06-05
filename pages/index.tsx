import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import ProductsFeatured from '../components/products-featured';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

// types
import { ProductLists, ProductTypeList } from 'types';

interface SelectedProduct {
  category: string;
  pid: string;
}


 
export const getStaticProps: GetStaticProps = async ({}) => {
   
  const getFeaturedProducts = async () => {
    const dirPath = path.join(process.cwd(), 'public/images/tattoo',);
    const infoPath = path.join(dirPath, 'selected.json');
    if (!fs.existsSync(infoPath)) {
      return {
        notFound: true,
      };
    }
    const content = fs.readFileSync(infoPath, 'utf8');
    const dirs: SelectedProduct[] = JSON.parse(content);
  
    const tattoos: ProductLists = dirs.map(({ category, pid }) => {
      const infoPath = path.join(dirPath, category, pid, 'info.json');
      if (!fs.existsSync(infoPath)) {
        return {} as ProductTypeList;
      }
      const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
  
      const images = fs.readdirSync(path.join(dirPath, category, pid)).filter((file) =>
        file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.webp') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpeg') 
      );
      const single: ProductTypeList = { id: pid, color: '', name: info.title, currentPrice: info.price, price: info.price, category: category, images: [`/images/tattoo/${category}/${pid}/${images[0]}`] };
      return single;
    });
    return tattoos;
  };
  const featuredProducts = await getFeaturedProducts();
  return {
    props: {
      featuredProducts
    },
  };
};



const IndexPage = ({featuredProducts}:{featuredProducts:ProductLists}) => {
  return (
    <Layout title='Wonderbird Tattoo Supply'>
      <PageIntro />

      <section className="featured">
        <div className="container">
          <article style={{backgroundImage: 'url(/images/featured-1.jpg)'}} className="featured-item featured-item-large">
            <div className="featured-item__content">
              <h3>Special offers</h3>
              <a href="/product/specialoffer" className="btn btn--rounded">Show products</a>
            </div>
          </article>
          
          <article style={{backgroundImage: 'url(/images/featured-2.jpg)'}} className="featured-item featured-item-small-first">
            <div className="featured-item__content">
              <h3>New products</h3>
              <a href="/product/newproduct" className="btn btn--rounded">More details</a>
            </div>
          </article>
          
          <article style={{backgroundImage: 'url(/images/featured-3.jpg)'}} className="featured-item featured-item-small">
            <div className="featured-item__content">
              <h3>tattoo<br/>furniture</h3>
              <a href="/product/newatist" className="btn btn--rounded">VIEW ALL</a>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Why should you choose us?</h4>
          </header>

          <ul className="shop-data-items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>All purchases over $199 are eligible for free shipping via USPS First Class Mail.</p>
              </div>
            </li>
            
            <li>
              <i className="icon-payment"></i>
              <div className="data-item__content">
                <h4>Easy Payments</h4>
                <p>All payments are processed instantly over a secure payment protocol.</p>
              </div>
            </li>
            
            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Money-Back Guarantee</h4>
                <p>If an item arrived damaged or you've changed your mind, you can send it
                back for a full refund.</p>
              </div>
            </li>
            
            <li>
              <i className="icon-materials"></i>
              <div className="data-item__content">
                <h4>Finest Quality</h4>
                <p>Designed to last, each of our products has been crafted with the finest materials.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <ProductsFeatured data={featuredProducts}/>
      <Subscribe />
      <Footer />
    </Layout>
  )
}


export default IndexPage