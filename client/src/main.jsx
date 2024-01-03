import ReactDOM from 'react-dom/client'
//import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/HomePage.jsx';
//import Detail from './pages/Detail.jsx';
//import NoMatch from './pages/NoMatch';
//import Login from './pages/Login';
//import Signup from './pages/Signup';
//import Success from './pages/Success';
//import OrderHistory from './pages/OrderHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />)
