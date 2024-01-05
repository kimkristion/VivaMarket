import ReactDOM from 'react-dom/client'
//import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/HomePage.jsx';
//import Detail from './pages/Detail.jsx';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/Signup.jsx';
//import Signup from './pages/Signup';
//import Success from './pages/Success';
//import OrderHistory from './pages/OrderHistory';
import Error from './pages/Error.jsx'

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
      { path: '/signup', element: <Signup />}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />)
