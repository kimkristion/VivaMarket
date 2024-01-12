import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/HomePage.jsx';
import Categories from './pages/Categories.jsx';
//import Detail from './pages/Detail.jsx';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/Signup.jsx';
//import Success from './pages/Success';
//import OrderHistory from './pages/OrderHistory';
import ContactUs from './pages/ContactUs';
import Error from './pages/Error.jsx'
//import CartPage from './pages/Cart.jsx';

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
      { path: '/categories', element: <Categories />},
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />)
