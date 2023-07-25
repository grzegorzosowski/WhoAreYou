import { Layout } from '@/components/Layout/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      autoHideDuration={3000}
      disableWindowBlurListener
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SnackbarProvider>
  );
}
