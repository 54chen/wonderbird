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
import { ProductType, MultiplePrice, ProductLists, ProductTypeList } from 'types';

interface Info {
  title: string;
  price: string;
  desc: string;
  images: string[];
  price2?: MultiplePrice | null;
}

interface SelectedProduct {
  category: string;
  pid: string;
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
    .filter(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.webp') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpeg')) 
    .map(file => `/images/tattoo/${category}/${pid}/${file}`);

  info.images = images;
  const product: ProductType = { id: pid, category: `${category}/${pid}`, name: info.title, thumb: info.images[0] || '', price: info.price, price2: info.price2 || null, count: 1, color: 'black', size: 'M', images: info.images, currentPrice: 0, description: info.desc, punctuation: { countOpinions: 0, punctuation: 0, votes: [] }, reviews: [] };
  
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
      product,
      featuredProducts
    },
  };
};



const Product = ({ product, featuredProducts }: { product: ProductType, featuredProducts: ProductLists }) => {

  return (
    <Layout>
      <Breadcrumb category={product.category} />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>


        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured data={featuredProducts} />
      </div>
      <Footer />
    </Layout>
  );
}

export default Product
