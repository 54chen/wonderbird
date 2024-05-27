import Layout from '../../layouts/Main';
import Footer from '../../components/footer';
import Breadcrumb from '../../components/breadcrumb';
import ProductsContent from '../../components/products-content';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import { ProductLists, ProductTypeList } from 'types';

export const getStaticPaths: GetStaticPaths = async () => {
  const tattooDir = path.join(process.cwd(), 'public/images/tattoo');
  const categories = fs.readdirSync(tattooDir).filter((file) =>
    fs.statSync(path.join(tattooDir, file)).isDirectory()
  );

  const paths = categories.map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category } = params as { category: string };
  const categoryDir = path.join(process.cwd(), 'public/images/tattoo', category);
  const subDirs = fs.readdirSync(categoryDir).filter((file) =>
    fs.statSync(path.join(categoryDir, file)).isDirectory()
  );

  const tattoos: ProductLists = subDirs.map((subDir) => {
    const infoPath = path.join(categoryDir, subDir, 'info.json');
    if (!fs.existsSync(infoPath)) {
      return {} as ProductTypeList;
    }
    const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));

    const images = fs.readdirSync(path.join(categoryDir, subDir)).filter((file) =>
      file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.png')
    );
    const single: ProductTypeList = {id:subDir, color:'',name: info.title, currentPrice:info.price, price:info.price, category:subDir, images: [`/images/tattoo/${category}/${subDir}/${images[0]}`]};
    return single;
  });

  return {
    props: {
      category,
      tattoos,
    },
  };
};


const Products = ({category, tattoos}:{category:string, tattoos:ProductLists}) => (
  <Layout>
    <Breadcrumb category={category}/>
    <section className="products-page">
      <div className="container">
        <ProductsContent category={category} data={tattoos} />
      </div>
    </section>
    <Footer />
  </Layout>
)
  
export default Products
  