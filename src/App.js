
import './App.css';
import Header from './Header';
import Home from './Home';
import {Switch,Route} from 'react-router-dom';
import { useEffect } from 'react';
import Checkout from './Checkout';
import Login from './Login';
import {auth} from "./Firebase";
import {useStateValue} from './StateProvider';

function App() {

  const [{},dispatch]=useStateValue();

  useEffect(()=>{

    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser=>{
      console.log('The User Is>>>',authUser);

      if(authUser){
        //the user just logged In or the user was logged in
        dispatch({
          type:"SET_USER",
          user:authUser
        })
      }else
      {
        //the user logged out
        dispatch({
          type:"SET_USER",
          user:null
        })
      }

    })


  },[]);


  return (
    <div className="App">
       
      <Switch>
        <Route path="/" exact>
        <Header/>
        <Home/>
        </Route>

        <Route path="/checkout" exact>
        <Header/>
        <Checkout/>
        </Route>

        <Route path="/login" exact>
          <Login/>
        </Route>

      </Switch>
    
    </div>
  );
}

export default App;

//react-currency-format
//deployment link
//https://challenge-8430f.web.app

