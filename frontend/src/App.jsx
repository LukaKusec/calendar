import { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import "./App.css"
import GoogleButton from './GoogleButton';
import DaysSection from './Days/DaysSection';
import Events from './Events/Events';
import { getToken, setToken, removeToken } from './util';
import { SERVER_URL, SCOPE } from './constants';


export default function App() {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showDays, setShowDays] = useState(7);

  

  useEffect(()=>{
    axios.defaults.baseURL = SERVER_URL

    axios.interceptors.request.use(function (request) {
      request.headers.Authorization = `Bearer ${getToken()}`
      return request
    }, function (error){
      return Promise.reject(error)
    })


    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if(error.response.status === 401){
        setIsAuthorized(false);
        removeToken();
      }
      return Promise.reject(error);
    });


    const access_token = getToken();
    if(access_token)
      setIsAuthorized(true)

  }, [])


  const login = useGoogleLogin({
    scope: SCOPE,
    onSuccess: async tokenResponse => {
      setToken(tokenResponse.access_token);
      setIsAuthorized(true)
    },
    onError: err => {
      console.log("Error")
    }
  });

  const logout = ()=>{
    googleLogout()
    removeToken()
    setIsAuthorized(false)
  }



  return (
    <>
      <h1>
        React Engineer Calendar
      </h1>

      {isAuthorized ?
        <>
          <GoogleButton onClick={logout} text="Log out"></GoogleButton>
          <DaysSection selectedDays={showDays} setShowDays={setShowDays}></DaysSection>
          <Events showDays={showDays} isAuthorized={isAuthorized}></Events>
        </>
         :
        <GoogleButton onClick={login} text="Sign in with Google"></GoogleButton>
      }
    </>
  )
}

