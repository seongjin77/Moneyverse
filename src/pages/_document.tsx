import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link
          rel="apple-touch-icon"
          href="/images/favicon.png"
          type="image/png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Moneyverse - 금융 상식을 더 쉽게</title>
        <meta
          name="description"
          content="Moneyverse는 금융 상식을 더 쉽게 배울 수 있도록 돕는 서비스입니다."
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
