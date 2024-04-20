'use client'

import Image from "next/image";
import "../styles/globals.css"
import CustomNavbar from "@/components/navbar";

export default function Home() {
  return (
    <>

    <CustomNavbar />
    <div style={{height:"90vh"}}>
      <h1 style={{fontSize:"3rem",textAlign:"center",paddingTop:"20vh"}}>Hi MF</h1>
      <h2 style={{fontSize:"2rem",textAlign:"center",paddingTop:"5vh"}}>Hi MF</h2>
    </div>  
    </>

  );
}
