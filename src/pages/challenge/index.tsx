import Image from 'next/image';
import { useRouter } from 'next/router';
import CustomNavbar from "@/components/navbar";
import { useEffect, useState} from 'react'
import "../../styles/globals.css"


import React from 'react';
// shows image in a box taking up most of the screen and a little section for metadata below

export default function Challenge() {
    const router = useRouter();
    const { id } = router.query;
 const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true);
    const [returned, setReturned] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', selectedFile);
        try {
            const res = await fetch('http://localhost:4009/upload?id=' + id , {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            const roundedMiles = Math.ceil(data.distanceScore);
            setData({similarityScore: data.similarityScore, distanceScore: roundedMiles});
            router.push({
                pathname: '/score',
                query: { distance: roundedMiles.toString(), similarity: data.similarityScore }
            });
            setReturned(true);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    
 
  useEffect(() => {
    fetch('http://localhost:4009/img/' + id)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, []); 

     if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

    return (<> <CustomNavbar /><div className="container flex flex-col items-center justify-center mx-auto h-screen">
            <h1 className="text-4xl pb-5">Challenge: </h1> 
        <div className="image-container h-3/4">
        <Image src={"http://localhost:4009/" + data.imagePath + ".jpg"} alt="Slider" width={3024} height={4032} className="object-scale-down max-h-full" /> </div>
     <div>
  <input type="file" name="photo" id="photo" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Submit</button>
            </div>  
    </div></>
    );
 
}
