import Footer from 'components/footer';
import Layout from '../layouts/Main';
import Link from 'next/link';

const NewsPage = () => (
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/">
            <a><i className="icon-left"></i> Back to Home</a>
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">Needle</h2>
          <p className="form-block__description"></p>
          
          <div className="product-item">
          <div className="product__image">
          <a href="/product/needle/cnc20HRL"><img src="/images/tattoo/needle/cnc20HRL/CNCHRL1.webp" alt="product"/></a>
          </div>
          <div className="product__description">
            <h3>CNC Police Tattoo Needle Cartridges Hollow Round Liner/HRL 20PCS</h3>
          <div className="product__price "><h4>NZ$36.28</h4></div></div></div>
            
          <div className="product-item">
          <div className="product__image">
          <a href="/product/needle/cnc20HRL"><img src="/images/tattoo/needle/cnc20HRL/CNCHRL1.webp" alt="product"/></a>
          </div>
          <div className="product__description">
            <h3>CNC Police Tattoo Needle Cartridges Hollow Round Liner/HRL 20PCS</h3>
          <div className="product__price "><h4>NZ$36.28</h4></div></div></div>
          <div className="product-item">
          <div className="product__image">
          <a href="/product/needle/cnc20HRL"><img src="/images/tattoo/needle/cnc20HRL/CNCHRL1.webp" alt="product"/></a>
          </div>
          <div className="product__description">
            <h3>CNC Police Tattoo Needle Cartridges Hollow Round Liner/HRL 20PCS</h3>
          <div className="product__price "><h4>NZ$36.28</h4></div></div></div>


        </div>

      </div>
    </section>
    <Footer />
  </Layout>
)
  
export default NewsPage
  