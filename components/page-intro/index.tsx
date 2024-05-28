import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Navigation} from 'swiper';
import { useRouter } from 'next/router';

SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {
  const router = useRouter();

  // const handleClick = (url: string) => () => {
  //   console.log('url', url);
  //   // router.push(url);
  //   };

  const slides = [
    { id: 1, url: '/product/needle/en05s20RL', imgSrc: '/images/TKSLARGE1.jpg', desc: 'Special New Arrival',link: 'Shop Now' },
    { id: 2, url: '/product/needle/cnc20RL', imgSrc: '/images/tattoo/HAWINK.webp', desc: '', link:'' },
    { id: 3, url: '/product/needle/athekingssword20RL', imgSrc: '/images/PRINTER.jpg', desc: '', link:'' }
  ];

  const handleSlideClick = (url:string) => {
    router.push(url);
  };

  return (

    <section className="page-intro"> 
      <Swiper navigation effect="coverflow" loop={true} className="swiper-wrapper">
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div key={slide.id} className="page-intro__slide" style={{ backgroundImage: "url("+slide.imgSrc+")"}}  onClick={()=>handleSlideClick(slide.url)}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>{slide.desc}</h2>
                <a href={slide.url} className="btn-shop"><i className="icon-right"></i>{slide.link}</a>
              </div>
            </div>
          </div>
        </SwiperSlide>  
      ))}
      </Swiper>

      {/* <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Ship</h4>
                <p>On purchases over $199</p>
              </div>
            </li>
            
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>100% Satisfied Customers</h4>
                <p>Our clients' opinions speak for themselves</p>
              </div>
            </li>
            
            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
    </section>
  )
};

export default PageIntro
