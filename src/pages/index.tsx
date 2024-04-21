'use client'

import Image from "next/image";
import "../styles/globals.css"
import CustomNavbar from "@/components/navbar";
import { useEffect,useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client'
import {Button} from "@nextui-org/react";
import { useRouter } from "next/router";
import {useAuth} from "../pages/AuthContext"


export default function Home() {
  const { user, error, isLoading } = useUser();
  const { isLoggedIn, login, logout, setUserName } = useAuth(); // Assuming your AuthContext provides login, logout, and setUserName functions

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if (user) {
      login(user.name || 'Guest')
    }
    else {
      logout()
    }
  }, [user,login, logout])

  // useEffect(() => {
  //   if (user) {
  //     setIsAuthenticated(true);
  //   }
  //   else {
  //     setIsAuthenticated(false);
  //   }
  // }, [user])



  const handleRedirect = () => {
    router.push('/feed'); // Replace '/other-page' with the desired route
  };

  


  return (
    <>

    <CustomNavbar/>
    { user ? (
        <div style={{alignItems:"center",textAlign:"center"}}>
        <h1 style={{fontSize:"3rem",textAlign:"center",paddingTop:"20vh",alignItems:"center"}}>Hello {user?.name}!</h1>
        <Button size="lg" color="primary" onClick={handleRedirect} style={{marginTop:"5vh"}}>Your Feed</Button>
        
        {/* <h2 style={{fontSize:"2rem",textAlign:"center",paddingTop:"5vh"}}>Your Feed</h2> */}
        </div>
      ) : (
        <div>
        <h1 style={{fontSize:"3rem",textAlign:"center",paddingTop:"20vh"}}>Hello!</h1>
        <h2 style={{fontSize:"2rem",textAlign:"center",paddingTop:"5vh"}}>Please Log In</h2>
        </div>
      )}
    </>

  );
}
