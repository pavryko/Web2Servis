import axios from "axios";

export const AddProduct = async(name, price, description, amount, image , userId) =>{
    const formDataProduct = new FormData();
    formDataProduct.append("ProductName", name);
    formDataProduct.append("Price", price); 
    formDataProduct.append("Description", description);
    formDataProduct.append("Amount", amount);
    formDataProduct.append("Image", image);
    formDataProduct.append("UserId", userId);

    try{
        const response =  await axios.post(`${process.env.REACT_APP_API_URL}/newproduct`,
        formDataProduct,
        );
        if(response.status === 200){
            console.log('Uspesno poslato na server!');
        }
        else{
            console.log('Gresku vratio server!');
            
        }
        console.log(response.data);
    }
    catch (error){
        console.log('Gresku vratio klijent!')
        console.error(error);
    }  
}
export const GetProducts = async() =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Product/getproducts/${localStorage.getItem('id')}`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
      } catch (error) {
        console.error(error);
      }

}
export const DeleteProduct = async(id) =>{
    const respone = await axios.put(`${process.env.REACT_APP_API_URL}/api/Product/deleteproduct/${id}`);
    console.log(respone.data);
}
export const GetProduct = async(id) =>{
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Product/getproduct/${id}`);
    console.log(response.data);
    const data = response.data;
    return data;
    //localStorage.removeItem('editproduct');
    //localStorage.setItem('editproduct', JSON.stringify(response.data));
}
export const ChangeProduct = async(productId,name, price, amount, description) =>{
    console.log(productId,name,price,amount,description);
    const respone = await axios.put(`${process.env.REACT_APP_API_URL}/api/Product/editproduct/${productId}`,{
       Name:name, Price:price,Amount:amount,Description:description
    });
    console.log(respone);

}
export const GetAllProducts = async() =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getallproducts`);
        
        const data = response.data;
        console.log(data);
        //localStorage.setItem('products', JSON.stringify(response.data));
        return data;
       //return response.data;
      } catch (error) {
        console.error(error);
      } 
}