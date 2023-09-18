import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Google = ({ onSuccess }) => {
  const responseGoogle = (response) => {
    // Pozivamo onSuccess funkciju prosleđenu kao prop
    // i prosleđujemo dobijene informacije o korisniku
    onSuccess(response);
  };

    return (
        <GoogleLogin
          clientId="your-google-client-id"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle} // Ovde možete dodati logiku za neuspešnu prijavu
          cookiePolicy={'single_host_origin'}
          shape="pill"
          
        />
    )
}

export default Google;