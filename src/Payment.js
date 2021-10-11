import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {Link,useHistory} from 'react-router-dom';
import "./Payment.css";
import Checkbox from '@material-ui/core/Checkbox';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from './reducer';
import {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import {auth,db} from './Firebase';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

function Payment() {
    const [{basket,user},dispatch]=useStateValue();


    const [userDetails,setUserDetails]=useState("");

    

    const [open, setOpen] = useState(false);
    const [address,setAddress]=useState("");

    const history=useHistory();

    const classes = useStyles();

   const handleSubmit=(e)=>{
        //do submit stuff

        basket.map(b=>{

            db.collection("Orders").add({
                img_url: b.image,
                name: b.title,
                price:b.price,
                quantity:b.quantity,
                rating:b.rating,
                type:b.type,
                userEmail:user.email
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                dispatch({
                    type:"CLEAR_BASKET"
                  });
                history.push('/orders');

            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        })

    }

  

    useEffect(()=>{

        db.collection('Users').where('email','==',user.email).onSnapshot(snapshot=>{
            setUserDetails(snapshot.docs.map(doc=>{return {id:doc.id}}))
        })



    },[]);




    //below for adding address
    const handleChange = (event) => {
        setAddress(event.target.value || '');
      };
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleAddress=()=>{
        // e.preventDefault();
        console.log("In Handle Submit");
        dispatch({
            type:"ADD_USER__ADDRESS",
            address:address,
          });

          console.log(userDetails);
        

        //update will update the document but set will completely override the document
           // console.log(userDetails);
          db.collection("Users").doc(userDetails[0].id).update({
            address:address
        });

          setOpen(false);

      };

    return (
        <div className="payment">

                {/* dialog to add address */}
            <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Your Address</DialogTitle>
                    <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="demo-dialog-native">Address</InputLabel>
                        <Input
                            value={address}
                            onChange={handleChange}
                        >
                        </Input>
                        </FormControl>
                    </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddress} color="primary">
                        ok
                    </Button>
                    </DialogActions>
                </Dialog>
            

            <div className="payment__container">

            <Link to="/checkout">
            <h2>Checkout Items ({basket?.length}) items</h2>
            </Link>
                
            <div className="payment__section">

                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>Email:{user?user.email:""}</p>
                    <p>{user.address?user.address:<button className="payment__button" onClick={handleClickOpen}>Add Address</button>}</p>
                </div>

            </div>

            <div className="payment__section">
            <div className="payment__title">
                    <h3>Review Items And Deliver</h3>
                </div>

                <div className="payment__items">
                    {basket.map(b=>(
                        <CheckoutProduct
                            image={b.image}
                            id={b.id}
                            title={b.title}
                            rating={b.rating}
                            price={b.price}
                            quantity={b.quantity}
                        />
                    ))}
                    
                </div>

            </div>

            <div className="payment__section">
            <div className="payment__title">
                    <h3>Order Now</h3>
                </div>
            
                <button className="order__button" onClick={handleSubmit}>Order Now</button>
                
            </div>
        </div>
        </div>
    )
}

export default Payment;
