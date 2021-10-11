import React,{useState,useEffect} from 'react';
import './Home.css';
import Product from './Product';
import uuid from 'uuid/dist/v4';
import FlipMove from 'react-flip-move';
import {db} from './Firebase';
import { useStateValue } from './StateProvider';

function Home() {

    const [{ basket,user },dispatch]=useStateValue();

    //console.log(user);

    const [products,setProducts]=useState([]);

    //console.log(products);

    useEffect(() => {
        //this code runs when tha app loads
        db.collection('Products').onSnapshot(snapshot=>{
            //doc.data() returns a document in the form of an object
            //where as doc.data().todo returns a string
           
            setProducts(snapshot.docs.map(doc=>{ /*console.log(doc.name);*/ return {id:doc.data().id,title:doc.data().name,rating:doc.data().rating,price:doc.data().cost,image:doc.data().img_url}}));
        })
      }, [])

    return (
        <div className="home">
            <div className="home__container" >
               
            </div>

            <div className="home_products">
            
            <div className="home__row">
            {products.map(product=>(
          <Product 
          id={product.id}
          key={product.id}
          title={product.title}
          rating={product.rating}
          price={product.price}
          rating={product.rating}
          image={product.image}
          />
        ))}


                
            </div>

            <div className="home__row">
            
            </div>

            <div className="home__row" >
           
                
            </div>
            
        </div>
        </div>
    )
}

export default Home;
