import React,{useState, useEffect} from "react";
import NavigationBar from "./NavigationBar";
import { useCart } from "./data/CartData";
import { Ordering } from "../services/OrderService";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/toast.css';
import './css/BuyerCart.css';


const Cart = () =>{
    const { state: { cart },dispatch } = useCart();
    const [quantities, setQuantities] = useState({});
    const [comment, setComment] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const [productToDelete, setProductToDelete] = useState(null);
    const[paymentMethod,setPaymentMethod] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const fetchData = async () => {
                try {
                  const userId = localStorage.getItem('id');
                  
                  
                } catch (error) {
                  console.error('Error fetching profile data:', error);
                }
              }
              fetchData();
          }, 1000);
      
          return () => clearInterval(interval);
        
       
    },); 
    const handleQuantityChange = (productId, quantity) => {
        const product = cart.find(p => p.id === productId);
    
        if (product) {
            if (quantity < 1) {
                quantity = 1; // Postavljanje minimalne količine na 1
            } else if (quantity > product.amount) {
                quantity = product.amount; // Postavljanje količine na maksimalni dostupni amount
            }
            
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [productId]: quantity
            }));
        }
    };
    const handleCommentChange = event => {
        setComment(event.target.value);
    };
    const handleAddressChange = event => {
        setAddress(event.target.value);
    };
    const handleOrder = () => {
        const userId = localStorage.getItem('id');
        console.log(userId);
        const price = calculateTotalPrice();
        if(address ===''){
            toast.warning('Enter address!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(paymentMethod ===''){
            toast.warning('Choose payment method!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        const paidMethod = paymentMethod;
        const orderData = {
            comment,
            address,
            userId,
            price,
            paidMethod,
            orderProducts: Object.values(groupedCart).map(product => ({
                productId: product.id,
                quantity: product.totalQuantity
            }))
        };
        Ordering(orderData).then(() => {
            
            setQuantities({});
            setComment('');
            setAddress('');
            dispatch({ type: 'CLEAR_CART' });
            setPaymentMethod('');
            toast.success('Order placed successfully!', {
                position: "top-right",
                autoClose: 3000,
                className: 'custom-toast',
            });
        })
        .catch(error => {
            console.error('Error placing order:', error);
        });

    };
    const calculateTotalPrice = () => {
        let totalPrice = 3; // Fiksna postarina
        
        Object.values(groupedCart).forEach(product => {
            totalPrice += product.totalQuantity * product.price;
        });
        
        return totalPrice;
    };
    const groupedCart = cart.reduce((acc, product) => {
        if (!acc[product.id]) {
            acc[product.id] = { ...product, totalQuantity: 0 };
        }
        acc[product.id].totalQuantity += quantities[product.id] || 1;
        return acc;
    }, {});
    const StartShopping = () =>{
        navigate('/dashboard');
    }
    const handleRemoveClick = productId => {
        setProductToDelete(productId);
    };
    const confirmRemoveProduct = productId => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
        setProductToDelete(null); 
    };
   

    return (<>
        <NavigationBar/>
        {productToDelete && (
            <div className="modal">
                <div className="modal-content">
                    <p><h2>Are you sure you want to remove this product from your cart?</h2></p>
                    <button onClick={() => confirmRemoveProduct(productToDelete)}>Yes</button>
                    <button onClick={() => setProductToDelete(null)}>No</button>
                </div>
            </div>
        )}
        <br></br>
        <div className="cart-container">
            <div className="cart-header">
                <h2>Your Cart</h2>
            </div>
            <div className="cart-items">
                {Object.values(groupedCart).map((product, index) => (
                    <div className="cart-item" key={index}>
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </div>
                        <div className="quantity-input">
                            <input
                                type="number"
                                value={product.totalQuantity} 
                                min="1" 
                                onChange={e => handleQuantityChange(product.id, parseInt(e.target.value))}
                            />
                        </div>
                        
                        <button className="btn-remove-from-cart"  onClick={() => handleRemoveClick(product.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <br></br>
            {calculateTotalPrice() >300  ? 
            (<div className="total-price">
                <h4>Total Price:</h4>
                <p>{calculateTotalPrice()}€</p>
                <p>*Shipping is 3€</p>
            </div>) :
            (
                <div className="back-to">
                    <br></br>
                   <h1>Your cart is empty...</h1>
                   
                   <button className="modern-button" onClick={StartShopping}><h3>Back to shopping?</h3></button>
                </div>
            )}
            
            
            <div className="comment-section">
                <label>Comment(Optional):</label>
                <textarea value={comment} onChange={handleCommentChange} />
            </div>
            <div className="address-section">
                <label>Delivery Address:</label>  <br></br>
                <input type="text" value={address} onChange={handleAddressChange} />
            </div>

        <div className="payment-section">
            <label><h3>Select Payment Method:</h3></label>
            <div className="payment-option">
                <input
                    type="radio"
                    id="payment-cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                />
                <label htmlFor="payment-cod">
                    <span className="radio-label">💵 Cash on Delivery</span>
                </label>
            </div>
        </div>
        <div className="order-button">
            <button onClick={handleOrder}>Place Order</button>
        </div>
       
       
    </div>
    <br></br>
        <br></br>
        <br></br>
    </>
    );
}



export default Cart;
