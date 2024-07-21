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
import photos from "./photos";
import { useEffect, useState } from 'react';
import Bird from 'assets/icons/Bird';
import Link from 'next/link';

const Page = () => {

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
          <b>Tattooist</b>
          <div style={{ padding: '20px', lineHeight: '1.6' }}>
            <div style={{ float: 'left', marginRight: '20px' }}>
              <Image
                src="/images/hao.webp" // 替换为您的图片路径
                alt="Tattoo Artist Hao"
                width={300} // 调整宽度
                height={300} // 调整高度
                style={{ borderRadius: '8px' }}
              />
            </div>
            <b>Tattoo Artist Hao</b>
            <p>
              Hao is a renowned tattoo artist celebrated for his exceptional craftsmanship and artistic vision.
              With over a decade of experience in the tattoo industry, Hao has honed his skills to perfection,
              specializing in intricate designs and custom artwork that resonates with his clients' individuality.
            </p>
            <p>
              Hao's work is characterized by a unique blend of traditional and contemporary styles, seamlessly
              integrating bold lines, delicate shading, and vibrant colors. His keen attention to detail and
              commitment to using high-quality materials ensure that each tattoo is a masterpiece, designed to
              last a lifetime.
            </p>
            <p>
              Clients from all over the world seek Hao's expertise, drawn by his reputation for creating personalized
              tattoos that not only adorn the skin but also tell a meaningful story. Whether it's a small, delicate piece
              or a large, complex design, Hao approaches every project with the same passion and dedication, striving to
              exceed his clients' expectations.
            </p>
            <p>
              Beyond his technical skills, Hao is known for his warm and approachable demeanor. He takes the time to
              understand each client's vision and collaborates closely with them throughout the design process,
              ensuring a comfortable and enjoyable experience.
            </p>
            <p>
              As a tattoo artist, Hao continues to push the boundaries of creativity, constantly exploring new techniques
              and styles. His work has been featured in numerous tattoo conventions and publications, earning him a
              well-deserved place among the top tattoo artists in the industry.
            </p>
          </div>


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
