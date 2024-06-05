import { NextPageWithLayout } from '@/data/types/next-page-with-layout.types';
import AppLayout from '@/layout/app.layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return <>
    <AppLayout getLayout={getLayout}>
      <Component {...pageProps} />
    </AppLayout>
  </>
}
