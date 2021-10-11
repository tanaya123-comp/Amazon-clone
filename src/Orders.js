import React,{useEffect,useState} from 'react';
import { useStateValue } from './StateProvider';
import {useHistory,Link} from 'react-router-dom';
import {db} from './Firebase';
import './Orders.css';

function Orders(props){

    const [{user},dispatch]=useStateValue();

    const [orders,setOrders]=useState([]);



    const history =useHistory();

    useEffect(()=>{

        if(user===null)
        {
            history.push('/login');
        }
        else{

            db.collection('Orders').where('userEmail','==',user.email).onSnapshot(snapshot=>{

                setOrders(snapshot.docs.map(doc=>{return {id1:doc.id,type:doc.data().type,name:doc.data().name,quantity:doc.data().quantity,price:doc.data().price,orderAt:doc.data().orderedAt,image_url:doc.data().img_url}}))
    
            })
    
            console.log(orders);
    

        }
        
        //console.log(user.email);

       

    },[]);

    return(
        <div className='orders'>
            <h2>My Orders</h2>
            <div className="orders__products">
            
                    {orders.map(order=>(
                        <div className='order__product'>
                        <img src={order.image_url} alt="order__image" className='order__image'/>
                        <div className="order_details">
                            <h4>{order.name} </h4>
                            <h5>Type:{order.type}</h5>
                            <h5>Quantity:{order.quantity}</h5>
                            <h5>${order.price}</h5>
                            <button className="order__button">Track Order</button>
                        </div>
                        </div>
                        
                    ))}
            
            </div>
        </div>
    );

}

export default Orders;
