import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
);

export default App;
