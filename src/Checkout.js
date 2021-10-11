import React from 'react';
import "./Checkout.css";
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import FlipMove from 'react-flip-move';

function Checkout() {
    const [{basket,user},dispatch]=useStateValue();


    return (
        <div className="checkout">

            <div className="checkout__left">

                <img className="checkout__add" 
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/Coupons/ART/Diwali-18/stripe_pc._CB483582784_.jpg"
                alt=""
                />

              
                <div className="checkout__title">
                    <h3>{user?user.email:""}</h3>
                    <h2 className="checkout__list">Your Shopping Basket</h2>
                        {basket.map(item=>(
                            <CheckoutProduct 
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                quantity={item.quantity}
                            />
                        ))}
                </div>
                

            </div>

            <div className="checkout__right">
                    <Subtotal/>
            </div>
            
        </div>
    )
}

export default Checkout;
