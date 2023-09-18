import React,{useState, useEffect} from "react";
import "./css/Products.css"
import { AddProduct, GetProducts, DeleteProduct } from "../services/ProductService";
import NavigationBar from "./NavigationBar";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './css/toast.css';
const Products = () =>{
    const[name,changeName] = useState("");
    const[price, changePrice] = useState("");
    const[amount, changeAmount] = useState("");
    const[description,changeDescroption] = useState("");
    const[image, changeImage] = useState(null);
    const[ImageToDisplay, setImageToDisplay] = useState("");    
    const[products, changeProducts] = useState([]);
    const[productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const fetchData = async () => {
                try {
                  const data = await GetProducts();
                  console.log(data);
                  changeProducts(data);
                } catch (error) {
                  console.error('Error fetching profile data:', error);
                }
              }
              fetchData();
              localStorage.setItem('products', JSON.stringify(products));
        }, 1000); 
        return () => {
           
            clearInterval(intervalId);
          };
       
    },);
    const handleImageChange = e =>{
        console.log("Load image...");
        const selectedImage = e.target.files[0]; 
        changeImage(selectedImage);
        setImageToDisplay(URL.createObjectURL(selectedImage))
    }
    const AddProducts= async(event) =>{
        event.preventDefault();
        if(!name){
            toast.warning('Enter your name!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!price){
            toast.warning('Enter your price!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!amount){
            toast.warning('Enter your amount!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!description){
            toast.warning('Enter your description!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        try{
            await AddProduct(name,price,description,amount,image,localStorage.getItem('id'));
            changeName("");
            changeAmount("");
            changeDescroption("");
            changePrice("");
            changeImage(null);
            setImageToDisplay("");
           
        }
        catch(error){
            console.error(error);
        }
        setProductToDelete(null);
    }
    const Delete = (id) =>{
        DeleteProduct(id);
        setProductToDelete(null);
    }
    const handleRemoveClick = productId => {
        setProductToDelete(productId);
    };

    return <>
        <NavigationBar/>
        {productToDelete && (
            <div className="modal">
                <div className="modal-content">
                    <p><h2>Are you sure you want to delete this product?</h2></p>
                    <button onClick={() => Delete(productToDelete)}>Yes</button>
                    <button onClick={() => setProductToDelete(null)}>No</button>
                </div>
            </div>
        )}
        <br></br>
        <h1 className="title-newproduct">Add new product:</h1>
        <div className="container-products">
            
            <div className="item">
                <h2>Product name: </h2><input type="text" placeholder="Name"  value={name} onChange={(e) => changeName(e.target.value)}/>
            <h2>Price: </h2><input type="text" placeholder="Price"  value={price} onChange={(e) => changePrice(e.target.value)}/>
            
            
                  <h2>Amount: </h2><input type="text" placeholder="Amount"  value={amount} onChange={(e) => changeAmount(e.target.value)}/>
                <h2>Description: </h2><input type="text" placeholder="Description"  value={description} onChange={(e) => changeDescroption(e.target.value)}/><br/><br/><br/><br/>
                <button className="modern-button" onClick={AddProducts}><h3>Add product</h3></button>
            </div>

            <div className="item">
                {ImageToDisplay && <img id="profile-img"  className="profile-img-card" src={ImageToDisplay} alt="Selected Image" />}<br/><br/>
                <input type="file" accept=".png, .jpg, .jpeg" style={{height: "34px"}} onChange={handleImageChange} />
            </div>
        </div>
        
       
        <div className="existing-products"> 
            <h1 className="title-newproduct">Existing product:</h1>
            <div className="container-forproduct">
            {products.map((p) => (
                <div className="product">
                    <h2> {p.name}</h2>
                    <img className="image-listofproduct" src= {`data:image/jpeg;base64,${p.image}`} alt={p.name} />
                        <h3>Amount:</h3> {p.amount}
                        <h3>Price:</h3> {p.price}€
                        <h3>Description:</h3> {p.description}<br></br>
                        
                        <button key={p.id} onClick={() => handleRemoveClick(p.id)}>Delete</button>
                        
                        <button>
                            <Link to={`/editproduct/${p.id}`}>Change</Link>
                        </button>
                    
                </div>
            ))}

            </div>
           
        </div>
    
    </>

}

export default Products;