import Footer from 'components/footer';
import Layout from '../layouts/Main';
import Link from 'next/link';

const ReturnsPage = () => (
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/">
            <a><i className="icon-left"></i> Back to Home</a>
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">Returnsxxxxx</h2>
          <p className="form-block__description">
            WonderBird Tattoo Supply is a tattoo supply company that offers a wide range of tattoo supplies. 
            <br /><br />
            We have a wide range of products, including tattoo machines, tattoo needles, tattoo ink, tattoo grips, tattoo power supplies, and more. 
            <br />
            Our products are made from high-quality materials and are designed to provide the best results for our customers. We are committed to providing the best products and services to our customers, and we are always looking for ways to improve our products and services. If you have any questions or concerns, please feel free to contact us. We are always happy to help.
           <img src="https://wonderbird.vercel.app/images/tattoo/ink/hawink14s/hawink1.webp" />
	</p>
        </div>

      </div>
    </section>
    <Footer />
  </Layout>
)
  
export default ReturnsPage
  