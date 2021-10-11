import React,{useEffect,useState} from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import {getBasketTotal} from './reducer';
import {useHistory} from 'react-router-dom';
import {db} from './Firebase';

function Subtotal() {
    const history=useHistory();
    const [{basket,user},dispatch]=useStateValue();

    const [address,setAddress]=useState("");


    useEffect(()=>{

        if(user!=null)
        {
            db.collection('Users').where('email','==',user.email).onSnapshot(snapshot=>{
                setAddress(snapshot.docs.map(doc=>{return {address:doc.data().address}}))
            })


        }
       

    },[]);


    const handleCheckout=(event)=>{


        if(basket.length!==0&&user!=null)
        {
            console.log(address);

            dispatch({
                type:"ADD_USER__ADDRESS",
                address:address[0].address,
              });

            history.push('/payment');
        }

    };
   

    return (
        <div className="subtotal">

        <CurrencyFormat 

        renderText={(value)=>(
            <>
            <p>
                Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
                <input type="checkbox"/>
                This order contains gift
            </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
  />
            {/* now we donot want it to have a link like styling so history.push helps us to redirect */}

            <button disabled={!basket.length} onClick={handleCheckout}>Proceed To checkout</button>
        </div>
    )
}

export default Subtotal;
