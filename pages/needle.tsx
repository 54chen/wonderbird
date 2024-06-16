import Footer from 'components/footer';
import Layout from '../layouts/Main';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ProductLists, ProductTypeList } from 'types';
import { GetStaticProps } from 'next';
import ProductsContent from 'components/products-content';

const params = ['needle/cnc20HRL','needle/cnc20M1','needle/cnc20RL','needle/cnc20RLT','needle/cnc20RM','needle/cnc20RS'];
const content = `
CNC Police Tattoo Needle Cartridges

Introducing the CNC Police Tattoo Needle Cartridges, a revolutionary advancement in tattoo technology designed to meet the highest standards of precision, safety, and efficiency. These needle cartridges are specifically engineered for professional tattoo artists who demand superior performance and exceptional results.

Precision and Performance

CNC Police Tattoo Needle Cartridges are crafted with meticulous attention to detail, ensuring unparalleled precision in every stroke. The needles are made from high-quality stainless steel, providing durability and resistance to corrosion. Each cartridge is designed to maintain its sharpness throughout extended tattoo sessions, reducing the need for frequent replacements and ensuring consistent, flawless results.

The innovative design of these cartridges allows for smooth ink flow, minimizing splatter and ensuring even distribution of color. This results in cleaner lines, more vibrant colors, and a more comfortable experience for both the artist and the client. Whether you’re working on intricate details or broad shading, CNC Police Tattoo Needle Cartridges deliver the performance you need to achieve your artistic vision.
`;

export const getStaticProps: GetStaticProps = async () => {
  const tattoos: ProductLists = params.map((category) => {
    const categoryDir = path.join(process.cwd(), 'public/images/tattoo', category);
    const infoPath = path.join(categoryDir, 'info.json');
    if (!fs.existsSync(infoPath)) {
      return {} as ProductTypeList;
    }
    const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
  
    const images = fs.readdirSync(categoryDir).filter((file) =>
      file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.webp') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpeg')
    );
    const single: ProductTypeList = {id:category, color:'',name: info.title, currentPrice:info.price, price:info.price, category:category, images: [`/images/tattoo/${category}/${images[0]}`], simple:true};
    return single;
  });
  
  return {
    props: {
      tattoos,
    },
  };
};

const Page = ({tattoos}:{tattoos: ProductLists}) => (
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/">
            <a><i className="icon-left"></i> Back to Home</a>
          </Link>
        </div>

        <div className="form-block" dangerouslySetInnerHTML={{__html: content.replace(/\n/g, '<br />')}}>
        </div>
        <section className="products-page">
          <div className="container">
            <ProductsContent category='' data={tattoos} />
          </div>
        </section>
      </div>
    </section>
    <Footer />
  </Layout>
)
  
export default Page
  