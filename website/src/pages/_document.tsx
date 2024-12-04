import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="max-w-screen-lg mx-auto px-4 flex w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
