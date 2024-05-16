import Footer from '../../components/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFeatured from '../../components/products-featured';
import Gallery from '../../components/product-single/gallery';
import Content from '../../components/product-single/content';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

// types
import { ProductType } from 'types';

type ProductPageType = {
  product: ProductType;
}
 

export const getStaticPaths: GetStaticPaths = async () => {
  const imagesDir = path.join(process.cwd(), 'public/images/tattoo');
  const directories = fs.readdirSync(imagesDir).filter(file =>
    fs.statSync(path.join(imagesDir, file)).isDirectory()
  );

  const paths = directories.map(dir => ({
    params: { pid: dir },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { pid } = params as { pid: string };
  const dirPath = path.join(process.cwd(), 'public/images/tattoo', pid);
  const infoPath = path.join(dirPath, 'info.json');

  if (!fs.existsSync(infoPath)) {
    return {
      notFound: true,
    };
  }

  const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
  const images = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.jpg'))
    .map(file => `/images/${pid}/${file}`);

  const product: ProductType = { ...info, images };
  const productPageType: ProductPageType = { product };
  return {
    props: {
      productPageType,
    },
  };
};





const Product = ({ product }: ProductPageType) => {

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
}

export default Product
