// show game results
import "../../styles/globals.css"
import { useRouter } from 'next/router';
import CustomNavbar from "@/components/navbar";
import React from 'react'

// various messages depending on distance score
export default function ScorePage() {
    const router = useRouter();
    const { distance, similarity } = router.query;
   return (<><CustomNavbar />
        <div className="container flex flex-col items-center justify-center mx-auto h-screen">
            <h1 className="text-7xl pb-5">You were within {distance} miles!</h1>
            <h2>{similarity} / 5 AI similarity score</h2>
        </div></>
        ); 
}
