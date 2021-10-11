
import './App.css';
import Header from './Header';
import Home from './Home';
import {Switch,Route} from 'react-router-dom';
import { useEffect } from 'react';
import Checkout from './Checkout';
import Login from './Login';
import {auth,db} from "./Firebase";
import {useStateValue} from './StateProvider';
import Payment from './Payment';
import IndividualProduct from './IndividualProduct';
import Orders from './Orders';

function App() {

  const [{user},dispatch]=useStateValue();

  useEffect(()=>{

    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser=>{
    //  console.log('The User Is>>>',authUser);

        

      if(authUser){
        // let user_obj=[];
        // let user_id;
        // db.collection('Users').where('email','==',user.email).onSnapshot(snapshot=>{

        //       user_obj=snapshot.docs.map((doc,user_id)=>{  user_id=doc.id; return {id:doc.id}});
  
        //   })

        //   console.log(user_obj);
        //   console.log(user_id);
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

        <Route path="/payment" exact>
        <Header/>
        <Payment/>
        </Route>

        <Route exact path="/IndividualProduct/:productId"   render={(routeProps)=> <IndividualProduct productId={routeProps.match.params.productId}/>}  />

        <Route path='/orders' exact>
          <Header/>
          <Orders/>
        </Route>
        
        


      </Switch>
    
    </div>
  );
}

export default App;

//react-currency-format
//deployment link
//https://challenge-8430f.web.app

