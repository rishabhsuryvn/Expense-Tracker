import React from 'react'
import {auth,provider} from '../../config/fireabseConfig';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate, Navigate} from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import "./style.css";

const Index = () => {
     const navigate = useNavigate();
     const {isAuth} = useGetUserInfo();

     const signInWithGoogle = async()=>{
        const result = await signInWithPopup(auth,provider);
        console.log(result);

        const authinfo ={
            userID: result.user.uid,
            name: result.user.displayName,
            profilePhoto: result.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem('auth',JSON.stringify(authinfo));
        navigate('/main');
    };

    if(isAuth){
      return <Navigate to='/main'/>
    }
    
  return (
    <div className='login-page'>
      <p>Sign in With Google</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default Index
