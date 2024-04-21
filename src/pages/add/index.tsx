import "../../styles/globals.css"
import CustomNavbar from "@/components/navbar";
import React, {useState} from "react"
import {Button} from "@nextui-org/react";

export default function add() {
    const [previewImage, setPreviewImage] = useState(null);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setIsImageVisible(true) // Set the data URL as the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("submitted!")
    setIsSubmitted(true);
  }
    return (
        <>
        <CustomNavbar />
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"5vh"}}>
            {!isImageVisible && 
            <>
            <h1 style={{fontSize:"3.5rem"}}> Add Your Own Image </h1>
            <h2 style={{fontSize:"2.5rem"}}> JPEG Only! </h2>
            <input style={{marginTop:"4vh"}} type="file" accept="image/*" onChange={handleFileChange} />
            </>
            }
            {previewImage && (
                <div>
                <h3>Preview:</h3>
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                </div>
            )}
            <Button size="lg" color="primary" onClick={handleSubmit} style={{marginTop:"3vh"}}>Submit</Button>
            {isSubmitted && 
            (<h2 style={{fontSize:"2.5rem"}}>Image Added to Challenges!</h2>) }
         </div>
       
        </>
    )
}