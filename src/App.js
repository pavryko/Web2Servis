import './App.css';
import React from 'react';
import {useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/css/toast.css';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import BuyerRoute  from './routes/BuyerRoute';
import SellerRoute from './routes/SellerRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import FirstPage from './components/FirstPage';
import ProfileChange from './components/ProfileChange';
import UnauthorizedUser from './components/UnauthorizedUser';
import UserControl from './components/AdminUserControl';
import Products from './components/Products';
import EditProducts from './components/EditProducts';
import Cart from './components/BuyersCart';
import { CartProvider } from './components/data/CartData';
import PreviousOrders from './components/BuyerPrevOrders';
import Orders from './components/SellerOrders';
import AllOrders from './components/AdminAllOrders';
import Dashboard from './components/Dashboard';
import SendOrders from './components/SellerSendOrders';

function App() {
  
  
  return <>
  <Router>
  <ToastContainer position="top-right" autoClose={3000} />
    <CartProvider>
      <Routes>
      
          <Route path='/' element={<FirstPage/>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        
          <Route path='/profile' element={<ProtectedRoute element={ProfileChange} />}/>
          <Route path='/dashboard' element={<ProtectedRoute element={Dashboard} />}/>

          <Route path='/acceptuser' element={<AdminRoute element={UserControl} />}/>
          <Route path='/allorders' element={<AdminRoute element={AllOrders} />}/>

          <Route path='/unauthorized' element={<SellerRoute element={UnauthorizedUser} />}/>
          <Route path='/products' element={<SellerRoute element={Products} />}/>
          <Route path='/editproduct/:productId' element={<SellerRoute element={EditProducts} />}/>
          <Route path='/orders' element={<SellerRoute element={Orders} />}/>
          <Route path='/sendorders' element={<SellerRoute element={SendOrders} />}/>

          <Route path='/cart' element={<BuyerRoute element={Cart} />}/>
          <Route path='/previousorders' element={<BuyerRoute element={PreviousOrders} />}/>

      </Routes>
    </CartProvider>
    </Router>
  </>;
}

export default App;
