import { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Script from 'next/script';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingStyle from '../components/stylesheet/Loading.module.css';

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Router.events]);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:type' content='website' />
      </Head>
      <Script id='google-tag-manager' strategy='afterInteractive'>
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
      `}
      </Script>

      {isLoading ? (
        <div className={LoadingStyle['lds-ring-background']}>
          <div className={LoadingStyle['lds-ring']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
