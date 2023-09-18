import React,{useEffect, useState}from "react";
import NavigationBar from "./NavigationBar";
import { useParams } from 'react-router-dom';
import { GetProduct, ChangeProduct } from "../services/ProductService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './css/toast.css';
import './css/EditProducts.css';

const EditProducts = () =>{
    const { productId } = useParams();

    const[editproduct, changeEditProduct] = useState({});

   
    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await  GetProduct(productId);
              console.log(data);
              changeEditProduct(data);
            } catch (error) {
              console.error('Error fetching profile data:', error);
            }
          }
          fetchData();  

          localStorage.setItem('editproduct', JSON.stringify(editproduct));
        //GetProduct(productId);
        //const res = localStorage.getItem('editproduct');
        //changeEditProduct(JSON.parse(res));
        
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        changeEditProduct({
          ...editproduct,
          [name]: value,
        });
      };
    const ChangePro = () =>{
        const res = localStorage.getItem('editproduct');
        const obj = JSON.parse(res);
        if(obj.name === editproduct.name && obj.price === editproduct.price && obj.amount === editproduct.amount && obj.description === editproduct.description && obj.image === editproduct.image){
           
            toast.warning("You didn't change any information!", {
              position: "top-center",
              autoClose: 3000,
              className: 'custom-toast',
          });
            return;
        }
        try{
            ChangeProduct(productId,editproduct.name,editproduct.price, editproduct.amount, editproduct.description);
            toast.success("Product change successfully!", {
              position: "top-center",
              autoClose: 3000,
              className: 'custom-toast',
          });
        }
        catch{

        }
       
    }

    return<>
       <NavigationBar/><br/><br/><br/><br/>
       <div className="container-products">
            <div className="item">
                 <img id="profile-img"  className="profile-img-card" src={`data:image/jpeg;base64,${editproduct.image}`} alt="Selected Image" /><br/><br/>
                <input type="file" accept=".png, .jpg, .jpeg" style={{height: "34px"}} name="image" onChange={handleChange} />
            </div>
            <div className="item">
                <h2>Product name:</h2><input type="text" placeholder="Name" name="name"  value={editproduct.name} onChange={handleChange}/>
            <h2>Price:</h2><input type="text" placeholder="Price" name="price"  value={editproduct.price} onChange={handleChange}/>
            </div>
            <div className="item">
                  <h2>Amount:</h2><input type="text" placeholder="Amount" name="amount"  value={editproduct.amount} onChange={handleChange}/>
                <h2>Description:</h2><input type="text" placeholder="Description" name="description"    value={editproduct.description} onChange={handleChange}/><br/><br/><br/><br/>
                <button onClick={ChangePro}><h2>Change</h2></button>
            </div>
        </div>
    </>
}

export default EditProducts;