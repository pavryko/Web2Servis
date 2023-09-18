import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const SellerRoute = ({ element: Component }) => {
    const isSeller = () => {
      var isAdmin = false;
      if(localStorage.getItem('token') !== null && localStorage.getItem('typeOfUser') === 'Seller'){
        isAdmin = true;
      }
      console.log(isAdmin);
        // Implementirajte logiku za proveru autentikacije, na primer, proveru prisustva JWT tokena u lokalnom skladištu.
        // Vratite true ako je korisnik autentikovan, inače false.
        // Ovo je samo simulacija, implementacija provere autentikacije zavisi od vašeg sistema za autentikaciju.
       
        return isAdmin;
      };
  return isSeller() ? <Component /> : <Navigate to="/dashboard" />;
};

export default SellerRoute;