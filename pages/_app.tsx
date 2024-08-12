import React, { Fragment, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

// types
import type { AppProps } from 'next/app';

// global styles
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';

import * as gtag from './../utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if(isProduction) {
  
  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }: AppProps) => {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url.startsWith('/studio')) {
        document.body.className = 'studio-bg';
      } else if (url.startsWith('/supply')) {
        document.body.className = 'supply-bg';
      } else {
        document.body.className = '';
      }
    };

    // Set the initial class based on the initial route
    handleRouteChange(router.pathname);

    // Listen for route changes and update the class accordingly
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
  <Fragment>
    <Component {...pageProps} />
  </Fragment>
)};

export default MyApp;