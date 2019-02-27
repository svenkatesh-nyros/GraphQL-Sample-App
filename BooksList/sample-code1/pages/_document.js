// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, {Head, Main, NextScript} from 'next/document'

class RYLYDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="UTF-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
          <link href="../static/css/semantic.min.css" rel="stylesheet" type="text/css"/>
          <link href="../static/css/custom.css" rel="stylesheet" type="text/css"/>
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3gVFuOVkbhzwEFFAJ23FJIUeU5Vji3Mg&libraries=places"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}

export default RYLYDocument;
