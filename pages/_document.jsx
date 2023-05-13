import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='zh-tw'>
        <Head>
          <meta
            name='description'
            content='This records are Developer, DevOps, Design and etc. Conferences In Taiwan and the world.'
          />
          <link rel='canonical' href='https://dcit.ivanwei.co' />
          <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
          <link rel='alternate icon' href='/favicon.ico' />
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
