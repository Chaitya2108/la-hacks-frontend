

import '../styles/globals.css'; // Global CSS styles
import { UserProvider } from '@auth0/nextjs-auth0/client';// Custom layout component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;