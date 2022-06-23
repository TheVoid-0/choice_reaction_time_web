import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { styled } from '../../stitches.config';

const AppWrapper = styled("div", {
  backgroundColor: "#F4F4F4",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Head>
        <title>Avaliador Tempo de Reação</title>
      </Head>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp;
