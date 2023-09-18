import axios from "axios";

export const Logging = async(username, password) =>{

    try{
        const response =  await axios.post(`${process.env.REACT_APP_API_URL}/login`,{
            Username: username,
            Password: password
        });
        if(response !== null){
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('u');
            localStorage.removeItem('confirmed');
            localStorage.removeItem('typeOfUser');
            console.log(response.data);
            const {token, id,typeOfUser, confirmed} = response.data;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            localStorage.setItem('id', id);
            console.log(localStorage.getItem('id'));
            localStorage.setItem('typeOfUser', typeOfUser);
            console.log(localStorage.getItem('typeOfUser'));
            localStorage.setItem('confirmed', confirmed);
            console.log(localStorage.getItem('confirmed'));
        }else{
            localStorage.setItem('token', "");
           
        }
       
    }
    catch (error){
        console.error(error);
    }  
}
export const LoggingWithGoogle = async(email, token) =>{
    try{
        const response =  await axios.post(`${process.env.REACT_APP_API_URL}/googlelogin`,{
            Email: email,
            Token: token
        });
        console.log(response);
        if(response !== null){
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('u');
            localStorage.removeItem('confirmed');
            localStorage.removeItem('typeOfUser');
            console.log(response.data);
            const {token, id,typeOfUser, confirmed} = response.data;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            localStorage.setItem('id', id);
            console.log(localStorage.getItem('id'));
            localStorage.setItem('typeOfUser', typeOfUser);
            console.log(localStorage.getItem('typeOfUser'));
            localStorage.setItem('confirmed', confirmed);
            console.log(localStorage.getItem('confirmed'));
        }else{
            localStorage.setItem('token', "");
            
        }
       
    }
    catch (error){
        console.error(error);
    }
}
export const Registring = async(username, password,email, name, surname, date,  address,  type, image) =>{
    
    const formData = new FormData();
    formData.append("UserName", username);
    formData.append("Password", password); 
    formData.append("Email", email);
    formData.append("Name", name);
    formData.append("Surname", surname);
    formData.append("Date", date);
    formData.append("Address", address);
    formData.append("TypeOfUser", type);
    formData.append("Image", image);
   

    try{
        const response =  await axios.post(`${process.env.REACT_APP_API_URL}/signup`,
        formData,
        );
        
        if(response.status === 200){
            console.log('Uspesno poslato na server!');
            const data = response.data;
            return data;
        }
        else{
            console.log('Gresku vratio server!');
            
        }
    }
    catch (error){
        console.log('Gresku vratio klijent!')
        console.error(error);
    }  


}
export const ProfileData = async() =>{
   
        //localStorage.removeItem('u');
        //localStorage.removeItem('imageBase64');
        //console.log(`${process.env.REACT_APP_API_URL}/api/Auth/${localStorage.getItem('UserName')}`);
        const respones = await axios.get(`${process.env.REACT_APP_API_URL}/api/User/${localStorage.getItem('id')}`);
        //console.log(respones);  
        console.log(respones.data);  
        const {u, imageBase64} = respones.data;
        console.log(u);  
       // console.log(imageBase64);  
        return {u, imageBase64};
        //console.log(u);  
        //localStorage.setItem('u',JSON.stringify(u));
        //console.log(localStorage.getItem('user'));
        //localStorage.setItem('imageBase64',imageBase64);
        //console.log(JSON.stringify(respones.data));
    
}
export const UpdateProfile = async(UserName, Name, Surname, Date, Email, Address, Image) =>{
    const formData = new FormData();
    formData.append("UserName2", UserName);
    formData.append("Name2", Name);
    formData.append("Surname2", Surname);
    formData.append("Date2", Date);
    formData.append("Email2", Email);
    formData.append("Address2", Address);
    formData.append("image2", Image);
    const id2 = localStorage.getItem('id');

    const respone = await axios.put(`${process.env.REACT_APP_API_URL}/api/User/${localStorage.getItem('id')}`,
        formData,
    );
    console.log(respone);

}
export const UpdatePassword = async(Password) =>{
    const respone = await axios.put(`${process.env.REACT_APP_API_URL}/api/User/updatepassword/${localStorage.getItem('id')}`,{
        Password : Password
    });
    console.log(respone);

}
export const UnAcceptedUsers = async() => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getunacceptedusers`);
        const data = response.data;
        return data;
       
       
       //return response.data;
      } catch (error) {
        console.error(error);
      }
}
export const AcceptedUsers = async() => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getacceptedusers`);
        const data = response.data;
        return data;
       
       
       //return response.data;
      } catch (error) {
        console.error(error);
      }
}
export const DeclinedUsers = async() => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getdeclinedusers`);
        const data = response.data;
        return data;
       
       
       //return response.data;
      } catch (error) {
        console.error(error);
      }
}
export const AcceptUser = async(id) =>{
    const respone = await axios.put(`${process.env.REACT_APP_API_URL}/api/User/acceptuser/${id}`);
    console.log(respone.data);
}
export const DeclineUser = async(id) =>{
    const respone = await axios.put(`${process.env.REACT_APP_API_URL}/api/User/declineuser/${id}`);
    console.log(respone.data);
}
export const GoogleInfo = async (credentialResponse) => {
    return new Promise((resolve, reject) => {
      // Google API endpoint za proveru autentičnosti
      const googleApiUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
  
      // Credential token koji ste dobili
      const credentialToken = credentialResponse.credential;
  
      // Napravite GET zahtev Google API-ju
      axios
        .get(`${googleApiUrl}?id_token=${credentialToken}`)
        .then((response) => {
          // Dobijeni odgovor sadrži informacije o korisniku
          const userInfo = response.data;
          console.log("User info:", userInfo);
  
          // Resolve Promise sa userInfo
          resolve(userInfo);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          // Reject Promise sa greškom
          reject(error);
        });
    });
};