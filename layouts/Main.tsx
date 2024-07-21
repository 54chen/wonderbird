import Head from 'next/head';
import Header from 'components/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
  showHeader?: boolean;
  allBlack?: boolean;
}

export default ({ children, title = 'Wonderbird Tattoo', showHeader = true, allBlack = false }: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [head, setHeader] = useState(false);
  useEffect(() => {
    if (pathname !== "/supply") {
      setHeader(true);
    }
  }, [pathname]);
  return (
    <div className={allBlack ? 'app-black' : 'app-main'}>
      <Head>
        <title>{title}</title>
      </Head>

      {showHeader && <Header />}

      <main className={(head ? 'main-page' : '')}>
        {children}
      </main>
    </div>
  )
}