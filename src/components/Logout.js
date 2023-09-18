import React from 'react';
import {useNavigate } from "react-router-dom";
const Logout = (props) => {
    const navigate = useNavigate();


    const HandleLogout = () => {
        // Brišemo JWT token iz lokalnog skladišta (LocalStorage)
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('u');
        localStorage.removeItem('confirmed');
        localStorage.removeItem('typeOfUser');
        console.log('obrisano');
        navigate("/login");
        // Takođe možete dodati dodatne akcije ili redirekcije ako je potrebno
    };

  return (
   <>
        <h2>Logout</h2>
      <button onClick={HandleLogout}>Logout</button>
   </>
  );
};

export default Logout;