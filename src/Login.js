import React,{useState} from 'react';
import './Login.css';
import {Link,useHistory} from "react-router-dom";
import {auth,db} from './Firebase';

function Login() {
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    
    const signIn=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(auth=>{
            history.push('/');
        }).catch(error=>alert(error.message+" "+"in error"));
    }

    const register=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
          //  console.log(auth);
          db.collection("Users").add({
            email:email,
            password:password,
            address:null,
        }).then((docRef)=>{
            console.log(docRef);
        }).catch((error)=>{
            console.log(error);
        })

            if(auth)
            {
                history.push('/');
            }
        }).catch(error=>alert(error.message))

        


    }

    const handlePassword=()=>{

    };
    

    return (
        <div className="login">
            <Link to="/">
            <img className="login__logo" src="https://www.freepnglogos.com/uploads/amazon-png-logo-vector/amazon-salary-png-logo-vector-5.png"/>
               </Link>
            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button type="submit" onClick={signIn} className="login__signInButton">Sign In</button>
                    <button className="login__signInButton" onClick={handlePassword}>Forget Password?</button>
                </form>
                <p>
                We maintain physical, 
                electronic and procedural safeguards in connection with the collection, storage 
                and disclosure of personal information (including sensitive personal information).
                 Our security procedures mean that we may occasionally request proof of identity 
                 before we disclose personal 
                 information to you.
                </p>
                <button onClick={register} className="login__registerButton">Create your Amazon account</button>
            </div>
            
        </div>
    )
}

export default Login;
