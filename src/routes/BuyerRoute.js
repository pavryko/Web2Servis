import React from 'react';
import { Navigate } from 'react-router-dom';

const BuyerRoute = ({ element: Component }) => {
    const isBuyer= () => {
      var isAdmin = false;
      if(localStorage.getItem('token') !== null && localStorage.getItem('typeOfUser') === 'Buyer'){
        isAdmin = true;
      }
      console.log(isAdmin);
        // Implementirajte logiku za proveru autentikacije, na primer, proveru prisustva JWT tokena u lokalnom skladištu.
        // Vratite true ako je korisnik autentikovan, inače false.
        // Ovo je samo simulacija, implementacija provere autentikacije zavisi od vašeg sistema za autentikaciju.
       
        return isBuyer;
      };
  return isBuyer() ? <Component /> : <Navigate to="/dashboard" />;
};

export default BuyerRoute;