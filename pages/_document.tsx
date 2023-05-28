import Document, { Html, Head, Main, NextScript } from 'next/document';

const description =
  'DCIT 行事曆記錄著與開發、維運、設計有關的研討會資訊。This records are Developer, DevOps, Design and etc. Conferences In Taiwan and the world.';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='zh-tw'>
        <Head>
          <meta name='description' content={description} />
          <link rel='canonical' href='https://dcit.ivanwei.co' />
          <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
          <link rel='alternate icon' href='/favicon.ico' />
          <meta property='og:type' content='website' />
          <meta property='og:description' content={description} />
          <meta property='og:locale' content='zh_TW' />
          <meta property='og:site_name' content='DCIT' />
          <meta property='og:image' content='https://blog.ivanwei.co/images/2018/05/16/DCIT.png' />
          <meta name='twitter:card' content='summary'></meta>
        </Head>

        <body>
          <Main />
          <NextScript />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
