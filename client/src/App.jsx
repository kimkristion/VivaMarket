
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  gql
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import TopLevelHeader from './components/TopLevelHeader';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CartProvider>
          <div className='App'>
            <TopLevelHeader />
            <Header />
            <Outlet />
            <Footer />
          </div>
        </CartProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
