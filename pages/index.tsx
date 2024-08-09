import Layout from '../layouts/Main';
import Bird from '../assets/icons/Bird/index.js';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// types 


const IndexPage = () => {
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
      // const logoElement = document.querySelector('.logo-white .svg') as HTMLElement;
      const logoElements = document.querySelectorAll('.logo-white .svg, .logo-white svg') as NodeListOf<HTMLElement>;
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
    <Layout title='Wonderbird Tattoo Supply' showHeader={false} allBlack={true}>
    <div className="parent">
        <Link href="/studio">
            <a className="glow square">
                <Image src="/images/studio.webp" alt="Studio" width={100} height={100} />
            </a>
        </Link>
        <div className="logo-white">
            <Bird />
        </div>
        <Link href="/supply">
            <a className="glow square">
                <Image src="/images/supply.webp" alt="Supply" width={100} height={100} />
            </a>
        </Link>
    </div>
    </Layout>
  )
}


export default IndexPage