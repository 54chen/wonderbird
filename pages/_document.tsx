import { Fragment } from 'react'
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'
import { GA_TRACKING_ID } from '../utils/gtag';

interface DocumentProps extends DocumentInitialProps {
  isProduction: boolean, pathname: string
}

export default class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx)
    
    // Check if in production
    const isProduction = process.env.NODE_ENV === 'production'

    return {
      ...initialProps,
      isProduction,
      pathname: ctx.pathname 
    }
  }

  render() {
    const { isProduction, pathname } = this.props
    console.log(pathname)
    return (
      <Html lang="en">
        <Head>

          {/* We only want to add the scripts if in production */}
          {isProduction && (
            <Fragment>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </Fragment>
          )}
        </Head>
        <body className={pathname=="/"?"body-black":"body-white"}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}