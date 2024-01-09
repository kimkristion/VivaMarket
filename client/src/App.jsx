import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'
import { ThemeProvider } from './components/ThemeContext';

//import ProductDetailPage from './pages/ProductDetailPage';

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
    <>
    <ThemeProvider>
      <div className='App'>
        <Header/>
        <Outlet/>
        <Footer />
    </div>
    </ThemeProvider>
    </>
    </ApolloProvider>
  );
}

export default App;
