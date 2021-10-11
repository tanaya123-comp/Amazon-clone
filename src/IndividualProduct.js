import React,{useState,useEffect} from 'react';
import Header from './Header';
import StarIcon from '@material-ui/icons/Star';
import "./IndividualProduct.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {useStateValue} from './StateProvider';
import {db} from './Firebase';
import {useHistory} from 'react-router-dom';


function IndividualProduct(props) {

    const [quantity,setQuantity]=useState(0);
    const [product,setProduct]=useState({});

    const [{basket},dispatch]=useStateValue();

    const history=useHistory();



    useEffect(()=>{


        db.collection('Products').onSnapshot(snapshot=>{
            //doc.data() returns a document in the form of an object
            //where as doc.data().todo returns a string

            const newProductList=snapshot.docs.filter(doc=>{   if(Number(doc.data().id)===Number(props.productId)){  return doc}});
            const newProduct={id:newProductList[0].data().id,title:newProductList[0].data().name,rating:newProductList[0].data().rating,type:newProductList[0].data().type,price:newProductList[0].data().cost,image_url:newProductList[0].data().img_url};
            setProduct(newProduct);
        });




    },[quantity]);



    const handleQuantity=(event)=>{
        setQuantity(event.target.value);
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
         //dispatch the item into the data layer
         if(quantity!==0)
         {

            dispatch(
                {
                    type:"ADD_TO_BASKET",
                    item:
                    {
                        id:product.id,
                        title:product.title,
                        image:product.image_url,
                        price:product.price,
                        rating:product.rating,
                        quantity:quantity,
                        type:product.type,
                    },
                });

                setQuantity(0);

                history.push('/');

         }
         
    }


    
    return (
        <>
        <Header/>
        <div className="individualProduct">
            
            <div>
            <img className="individualProduct__productImg" src={product.image_url}/>
            </div>
  
            

            <div className="individualProduct__productDetails">
                    <div className="individualProduct__productName">
                            <h2>{product.title}</h2>
                    </div>

                    <div className="individualProduct__productRating">
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                    </div>


                    <FormControl>
                            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={quantity}
                            onChange={handleQuantity}
                            >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            </Select>
                </FormControl>

                    

                    <div className="individualProduct__productPrice">
                        <h3>Grand Total:${Number(product.price)*Number(quantity)}</h3>
                    </div>

                    <button onClick={handleSubmit} className="individualProduct__addToBasket">Add To Basket</button>


            </div>
        </div>
        </>
    )
}

export default IndividualProduct;
