import Footer from '../../../components/footer';
import Layout from '../../../layouts/Main';
import Breadcrumb from '../../../components/breadcrumb';
import ProductsFeatured from '../../../components/products-featured';
import Gallery from '../../../components/product-single/gallery';
import Content from '../../../components/product-single/content';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

// types
import { ProductType } from 'types';

interface Info {
  title: string;
  price: string;
  desc: string;
  images: string[];
}
 
export const getStaticPaths: GetStaticPaths = async () => {
  const imagesDir = path.join(process.cwd(), 'public/images/tattoo');
  const categories = fs.readdirSync(imagesDir).filter(file =>
    fs.statSync(path.join(imagesDir, file)).isDirectory()
  );

  let paths: { params: { category: string, pid: string } }[] = [];

  categories.forEach(category => {
    const categoryDir = path.join(imagesDir, category);
    const directories = fs.readdirSync(categoryDir).filter(file =>
      fs.statSync(path.join(categoryDir, file)).isDirectory()
    );

    directories.forEach(dir => {
      paths.push({
        params: { category, pid: dir },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category, pid } = params as { category: string; pid: string };
  const dirPath = path.join(process.cwd(), 'public/images/tattoo', category, pid);
  const infoPath = path.join(dirPath, 'info.json');
  if (!fs.existsSync(infoPath)) {
    return {
      notFound: true,
    };
  }
  const content = fs.readFileSync(infoPath, 'utf8');
  const info: Info = JSON.parse(content);

  const images = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.webp'))
    .map(file => `/images/tattoo/${category}/${pid}/${file}`);

  info.images = images;
  const product: ProductType = {id: pid, name: info.title, thumb: info.images[0]||'', price: info.price, count: 1, color: 'black', size: 'M', images: info.images, currentPrice: 0, description: info.desc, punctuation: {countOpinions: 0, punctuation: 0, votes: []}, reviews: []};

  return {
    props: {
      product,
    },
  };
};



const Product = ({ product }: { product: ProductType }) => {

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
