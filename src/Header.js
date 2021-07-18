import React from 'react';
import './Header.css';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";

import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';
import {auth} from './Firebase';


  function Header(){

    const [{ basket,user },dispatch]=useStateValue();

    const handleAuthentication=()=>{
        if(user)
        {
          auth.signOut();
          
        }
    }

    return (
      <div className="header">
        <Link to="/">
        <img className="header__logo" 
        src="https://1000logos.net/wp-content/uploads/2016/10/Colors-Amazon-Logo-768x307.jpg"
        />
         </Link>

        <div className="header__search">
          <input className="header__searchInput" type="text"/>
          <SearchIcon className="header__searchIcon"/>

          </div>
       
       
        <div className="header__nav">
        <Link to={!user && '/login'}>
        
          <div className="header__options" onClick={handleAuthentication}> <span className="header__optionOne">Hello {user?user.email:"Guest"}</span>
          <span className="header__optionTwo">{user?"Sign Out":"Sign In"}</span>
          </div>
          </Link>
      

          <div className="header__options">

          <span className="header__optionOne">Return</span>

          <span className="header__optionTwo">Orders</span>
          </div>

          <div className="header__options">

          <span className="header__optionOne">Your</span>

          <span className="header__optionTwo">Prime</span>

          </div>

          <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon/>
            <span className="header__optionTwo header__basketCount">
            {basket.length}
            </span>
          </div>
          </Link>


        </div>

      </div>
    );


  }
  
    

export default Header;
