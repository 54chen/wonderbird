import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Navigation} from 'swiper';

SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {

  return (
    <section className="page-intro"> 
      <Swiper navigation effect="fade" className="swiper-wrapper">
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide-main.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Wonder Bird Tatto Supply</h2>
                <h5 className="btn-shop"><i className="icon-right"></i>Hillcrest, Hamilton</h5>
              </div>
            </div>
          </div>
        </SwiperSlide> 
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide-1.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Sale of the summer collection</h2>
                <a href="#" className="btn-shop"><i className="icon-right"></i>Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide-2.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Make your house into a home</h2>
                <a href="#" className="btn-shop"><i className="icon-right"></i>Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over $199</p>
              </div>
            </li>
            
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
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
      </div>
    </section>
  )
};

export default PageIntro