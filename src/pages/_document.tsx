import { Head, Html, Main, NextScript } from "next/document";
import { getCssText } from "../../stitches.config";

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/reactionTime.webp" />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
export default Document;