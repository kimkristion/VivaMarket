import ReactDOM from 'react-dom/client'
//import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/HomePage.jsx';
import Store from './pages/Store.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/Signup.jsx';
//import Success from './pages/Success';
//import OrderHistory from './pages/OrderHistory';
import ContactUs from './pages/ContactUs';
import Error from './pages/Error.jsx'
import Cart from './pages/Cart.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true, 
        element: <Home />
      },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup />},
      { path: '/contact-us', element: <ContactUs /> },
      { path: '/store', element: <Store />},
      { path: '/cart', element: <Cart />},
      { path: '/store/:_id', element: <ProductDetail />}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />)
