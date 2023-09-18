import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Component }) => {
    const isAdmin = () => {
      var isAdmin = false;
      if(localStorage.getItem('token') !== null && localStorage.getItem('typeOfUser') === 'Administrator'){
        isAdmin = true;
      }
      console.log(isAdmin);
      return isAdmin;
      };
  return isAdmin() ? <Component /> : <Navigate to="/dashboard" />;
};

export default AdminRoute;