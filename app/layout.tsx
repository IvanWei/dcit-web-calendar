// import { Suspense } from 'react';
import Script from 'next/script';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
// import LoadingStyle from '../components/stylesheet/Loading.module.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-tw'>
      <body>
        <Navbar />
        {/*<div className={LoadingStyle['lds-ring-background']}>
          <div className={LoadingStyle['lds-ring']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>*/}
        {children}
        <Footer />
      </body>
      <Script id='google-tag-manager' strategy='afterInteractive'>
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
      `}
      </Script>
    </html>
  );
}
