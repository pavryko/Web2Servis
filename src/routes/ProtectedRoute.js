import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const isAuthenticated = () => {
        // Implementirajte logiku za proveru autentikacije, na primer, proveru prisustva JWT tokena u lokalnom skladištu.
        // Vratite true ako je korisnik autentikovan, inače false.
        // Ovo je samo simulacija, implementacija provere autentikacije zavisi od vašeg sistema za autentikaciju.
        return localStorage.getItem('token') !== null;
      };
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;