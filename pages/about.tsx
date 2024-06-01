import Layout from '../layouts/Main';
import Link from 'next/link';

const AboutPage = () => (
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/">
            <a><i className="icon-left"></i> Back to Home</a>
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">About WonderBird Tattoo Suplly</h2>
          <p className="form-block__description">
            WonderBird Tattoo Supply is a tattoo supply company that offers a wide range of tattoo supplies. We have a wide range of products, including tattoo machines, tattoo needles, tattoo ink, tattoo grips, tattoo power supplies, and more. Our products are made from high-quality materials and are designed to provide the best results for our customers. We are committed to providing the best products and services to our customers, and we are always looking for ways to improve our products and services. If you have any questions or concerns, please feel free to contact us. We are always happy to help.
          </p>
        </div>

      </div>
    </section>
  </Layout>
)
  
export default AboutPage
  