import React from 'react';
import "./CheckoutProduct.css";
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';

function CheckoutProduct({image,id,title,rating,price,quantity}) {

    const [{basket},dispatch]=useStateValue();

    const removeFromBasket=()=>{
        //remove the item from the basket
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id:id,
        });

    }

    return (
        <div className="checkoutProduct">
                <img className="checkoutProduct__image" src={image}/>
                <div className="checkoutProduct__info">
                    <p className="checkoutProduct__title">{title}</p>
                    <p className="checkoutProduct__price">Quantity:{quantity}</p>
                    <p className="checkoutProduct__price"><small>$</small><strong>{Number(quantity) * Number(price)} </strong></p>
                    <div className="checkoutProduct__rating">
                    {
                    Array(rating)
                    .fill().map((_,i)=>(
                             <StarIcon key={i}/>
                    ))}
                    </div>
                    <button onClick={removeFromBasket}  className="checkoutProduct__button">Remove from basket</button>
                </div>  
            
        </div>
    )
}

export default CheckoutProduct;
