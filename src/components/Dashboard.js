import React,{useEffect, useState} from "react";
import NavigationBar from './NavigationBar';
import { GetAllProducts } from "../services/ProductService";
import { useCart } from "./data/CartData";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './css/toast.css';
import './css/Dashboard.css';

const Dashboard = () =>{
    const[allproducts,changeAllProducts] = useState([]);
    const { state: cart, dispatch } = useCart();
    const [addedToCart, setAddedToCart] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await GetAllProducts();
            changeAllProducts(data);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        }
        fetchData();
        localStorage.setItem('allproducts',JSON.stringify(allproducts));
    }, []);
   
    const Ordering = (product) =>{
       dispatch({ type: 'ADD_TO_CART', payload: product });
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.id]: true,
        }));
        toast.success('Successfully added to cart!', {
            position: "top-right",
            autoClose: 2000,
            className: 'custom-toast',
        });
    }

    return <>
    <NavigationBar/>
    <div className="product-list">
            {allproducts.map((p) => (
                <div className="product-item">
                    <div className="product-image">
                        <img  src= {`data:image/jpeg;base64,${p.image}`} alt={p.name} />
                    </div>
                    <div className="product-details"> 
                        <h2>{p.name}</h2><br/><br/>
                        <h4>Price:</h4> {p.price}€<br/><br/>
                        <h4>Description:</h4>{p.description}<br/><br></br>
                        <div className={`stock-indicator ${p.amount > 0 ? 'green' : 'red'}`}> 
                        </div>
                        <b>{p.amount > 0 ? 'Available' : 'Not available'}</b>
                        {localStorage.getItem('typeOfUser') === 'Buyer' && <div>
                            {p.amount > 0 ? (
                                <button className="order-btn" onClick={() => Ordering(p)} disabled={addedToCart[p.id]}>
                                    <h4>{addedToCart[p.id] ? 'Added' : 'Add to cart'}</h4>
                                </button>
                            ) : (
                                <p>Out of stock</p>
                            )}
                        </div> 
                        }
                    </div>
                </div>
            ))}
        </div>
    </>;
}

export default Dashboard;