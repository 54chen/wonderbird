import Footer from 'components/footer';
import Layout from '../layouts/Main';
import Image from 'next/image';

import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useEffect, useState } from 'react';
import Bird from 'assets/icons/Bird';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import type { Photo } from "react-photo-album";
import sizeOf from 'image-size';

export const getStaticProps: GetStaticProps = async () => {
  const categoryDir = path.join(process.cwd(), 'public/images/tatoostudio/artist/haowang/work2');
  const imageFiles = fs.readdirSync(categoryDir).filter((file) =>
    file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.webp') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpeg')
  );

  const images = await Promise.all(
    imageFiles.map(async (file) => {
      const filePath = path.join(categoryDir, file);
      const dimensions = sizeOf(filePath);
      return {
        src: file,
        width: dimensions.width,
        height: dimensions.height,
        };
    })
  );

  return {
    props: {
      images,
    },
  };
};


const assetLink = (asset: string, width: number) => {
  return `/images/tatoostudio/artist/haowang/work2/` + asset;

}
const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const Page = ({images}: {images: {src: string;
  width: number | undefined;
  height: number | undefined;}[]}) => {
    
  const photos = images.map(
      ({src, width, height}) =>
        ({
          src: assetLink(src, width!),
          width,
          height,
          srcSet: breakpoints.map((breakpoint) => ({
            src: assetLink(src, breakpoint),
            width: breakpoint,
            height: Math.round((width! / height!) * breakpoint),
          })),
        }) as Photo,
    );

  const [index, setIndex] = useState(-1);
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
      // const logoElement = document.querySelector('.logo-white .svg') as HTMLElement;
      const logoElements = document.querySelectorAll('.intro .svg, .intro svg') as NodeListOf<HTMLElement>;
      logoElements.forEach(logoElement => {

        const rect = logoElement!.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        const maxOffset = 20; // 最大偏移量
        const offsetX = Math.max(-maxOffset, Math.min(maxOffset, x / 10));
        const offsetY = Math.max(-maxOffset, Math.min(maxOffset, y / 10));
        const glowEffect = `drop-shadow(${offsetX}px ${offsetY}px 20px rgba(255, 255, 255, 0.8))`;
        logoElement!.style.filter = glowEffect;
      });
    };
    const onMouseMove = (event: { clientX: number; clientY: number; }) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => handleMouseMove(event));
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

  }, []);

  return (
    <Layout showHeader={false} allBlack={true}>
      <div className="intro">
        <Link href="/">
          <a><Bird /></a></Link>
      </div>

      <section className="form-block">

        <div className="container">

          <h1>&nbsp;</h1>
          <b style={{ paddingLeft: '30px'}}>About the Artist</b>
          <div style={{ padding: '20px', lineHeight: '1.6' }}>
            <div style={{ float: 'left', marginRight: '20px' }}>
              <Image
                src="/images/tatoostudio/artist/WechatIMG642.jpg" // 替换为您的图片路径
                alt="Tattoo Artist Hao"
                width={310} // 调整宽度
                height={200} // 调整高度
                style={{ borderRadius: '8px' }}
              />
            </div>
            <p>Welcome to my world of ink and artistry! My name is Hao Wang, and I am a passionate tattoo artist with a rich background in sculpting and design. Before dedicating my craft to the world of tattoos, I honed my skills as a sculptor at the renowned Weta Workshop.</p>
<p>&nbsp;</p>
<b>A Journey Through Sculpting</b>
<p>My journey as an artist began with sculpting, where I was privileged to work at <a className='custom-link' href="https://www.wetanz.com/us/artists/hao-wang" target='_blank'>Weta Workshop</a>, one of the most prestigious special effects and prop companies in the world. During my time there, I had the incredible opportunity to create detailed figures for Netflix's acclaimed series, Dark Crystal: Age of Resistance. Each piece was crafted with meticulous attention to detail and a deep appreciation for the art of storytelling. I'm proud to say that these figures were immensely popular and sold out, a testament to the dedication and passion I poured into each creation.
</p><p>&nbsp;</p>
<b>Transition to Tattooing</b>
<p>Transitioning from sculpting to tattooing was a natural progression for me. The skills and precision required in sculpting seamlessly translated into my tattoo work. I bring the same level of dedication, artistry, and attention to detail to every tattoo I design. Each piece is a unique work of art, tailored to tell the story and capture the essence of my clients' visions.
</p><p>&nbsp;</p>

<b>My Artistic Philosophy</b>
<p>In both sculpting and tattooing, my philosophy remains the same: to create art that resonates deeply with the individual, telling their story in a way that is both beautiful and meaningful. Whether it's a small, intricate design or a large, elaborate piece, I approach each tattoo with the same passion and commitment to excellence.
</p><p>&nbsp;</p>

<p>Thank you for considering me for your next tattoo. I look forward to collaborating with you to create a piece of art that you'll cherish forever.
</p>          </div>


          <PhotoAlbum photos={photos} layout="rows" targetRowHeight={150} onClick={({ index }) => setIndex(index)} />

          <Lightbox
            slides={photos}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            // enable optional lightbox plugins
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </div>
      </section>
      <Footer />
    </Layout>
  )
}

export default Page
