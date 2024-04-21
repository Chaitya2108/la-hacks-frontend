
import { AuthProvider } from './AuthContext';
import '../styles/globals.css'; // Global CSS styles
import { UserProvider } from '@auth0/nextjs-auth0/client';// Custom layout component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </UserProvider>
  );
}

export default MyApp;