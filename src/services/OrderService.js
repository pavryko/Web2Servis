import axios from "axios";



export const Ordering = async(orderData) =>{
    try {
        console.log(orderData);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/ordering`, orderData);
            console.log(response.data);
        if (response.status === 200) {
            // Porudžbina je uspešno kreirana
            //alert('Order placed successfully!');
        } else {
            // Neuspešno kreiranje porudžbine
            alert('Failed to place order.');
        }
    } catch (error) {
        // Greška pri slanju zahteva
        console.error('Error placing order:', error);
        alert('An error occurred while placing the order.');
    }
}
export const GetPreviousOrders = async(userId) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/previousorders/${userId}`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    }  

}
export const GetActiveOrders = async(userId) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/activeorders/${userId}`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    }  

}
export const GetWaitingOrders = async(userId) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/ordersonwait/${userId}`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    }  

}
export const GetWaitingOrdersSeller = async(userId) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/ordersonwaitseller/${userId}`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    }  

}
export const CancelOrder = async(orderId) =>{
    console.log(orderId);
    const respone = await axios.put(`${process.env.REACT_APP_API_URL}/cancelorder/${orderId}`);
    console.log(respone.data);
    const data = respone.data;
    return data;
}
export const GetSellerOrders = async(userId) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/sellerorders/${userId}`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    } 
}
export const GetSellerActiveOrders = async(userId) =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/selleractiveorders/${userId}`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    } 
}
export const GetAllActiveOrders = async() =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allactiveorders`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    } 

}
export const GetAllCanceledOrders = async() =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allcanceledorders`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    } 

}
export const GetAllPreviousOrders = async() =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allpreviousorders`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    } 

}
export const GetAllNotTakenOrders = async() =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allnottakenorders`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
    } catch (error) {
        console.error(error);
    } 

}

export const SendOrder = async(orderId) =>{
    console.log(orderId);
    const respone = await axios.put(`${process.env.REACT_APP_API_URL}/sendorder/${orderId}`);
    console.log(respone.data);
    const data = respone.data;
    return data;
}

  