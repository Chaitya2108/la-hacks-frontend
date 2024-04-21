
'use client';
import "../../styles/globals.css"
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {Button, ButtonGroup} from '@nextui-org/react';
import CustomNavbar from "@/components/navbar";
import {useAuth} from "../AuthContext"

// export default function HomePage() {
//   const [dynamicURL,setDynamicURL] = useState([])
//   const [images, setImages] = useState<any[]>([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//    // Example dynamic part
//   const staticPart = "http://localhost:4009/";
//   const jpg = ".jpg"
//   useEffect(() => {
//     // Fetch images from the external route
//     fetch('http://localhost:4009/images')
//       .then(response => response.json())
//       .then(data => {
//         setImages(data),
//         setDynamicURL(data[0].imagePath)
//         console.log(data)
//       })
//       .catch(error => console.error('Error fetching images:', error));
//   }, []);

//   console.log(images)
//   console.log(currentImageIndex)
//   console.log(images.length)

//   console.log(images); // Check if images array is populated correctly
//   console.log(currentImageIndex); // Check the value of currentImageIndex
//   console.log(images[currentImageIndex]); // Check the contents of the image object at the current index
//   console.log(images[currentImageIndex]?.imagePath);

//   const handleClick = () => {
//     console.log(currentImageIndex)

//     setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
//     setDynamicURL(images[currentImageIndex].imagePath)
//   };

//   return (
//     <>
//     <CustomNavbar />
//      <img     
//         src={staticPart + dynamicURL + jpg}
//         onClick={handleClick}
//         style={{ cursor: 'pointer' }}
//       />

//     </>
//     // <div>
//     //   <h1>Click the image to change it</h1>
//     //   <img src="http://localhost:4009/imageUploads/IMG_0034.jpg"></img>
     
//     // </div>
    
//   );

// }






// ImageSlider.js
export default function HomePage() {
    // synchronously calls api to get an array of chalenge ids
   const [challenges, setChallenges] = useState([]); 
    const [loading, setLoading] = useState(true);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isProcessingClick, setIsProcessingClick] = useState(false); // State to track if a click is being processed


  const goToPreviousImage = () => {
    if (!isProcessingClick) {
      setIsProcessingClick(true)
      setTimeout(() => setIsProcessingClick(false), 500);
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? challenges.length - 1 : prevIndex - 1;
      return newIndex;
    });
  }
  };

  const goToNextImage = () => {
    if (!isProcessingClick) {
      setIsProcessingClick(true)
      setTimeout(() => setIsProcessingClick(false), 500);
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % challenges.length;
      return newIndex;
    });
        setNumNext(numNext + 1);
  };
}


    function apiChallengesCall() {
 fetch("http://localhost:4009/images")
        .then(res => res.json())
        .then(data => {
            setChallenges(data);
            setCurrentImageIndex(0);
                setLoading(false);
                console.log(data);
        });

    }

    const router = useRouter();
    const { isLoggedIn, username } = useAuth();
    function goToChallenge() {
        // route to /challenge?challengeId=challengeId
        // challengId is last 8 characters of imagePath
        const challengeId = challenges[currentImageIndex].id;
        router.push({
            pathname: '/challenge',
            query: { id: challengeId }
        });
    }
    
    const handleKeyDown = (e) => {
        if(e.key === 'ArrowDown'){
            goToNextImage();
        } else if(e.key === 'ArrowUp'){
            goToPreviousImage();
        }
    }

    useEffect(() => {
        // keydown up and down arrow keys
        window.addEventListener('keydown', handleKeyDown);
            apiChallengesCall();
           }, []);

   const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50 

    const onTouchStart = (e) => {
      setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
      setTouchStart(e.targetTouches[0].clientY)
    }

const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY)

const onTouchEnd = () => {
  if (!touchStart || !touchEnd) return
  const distance = touchStart - touchEnd
  const isUpSwipe = distance > minSwipeDistance
  const isDownSwipe = distance < -minSwipeDistance
        if(isUpSwipe){
            goToNextImage();
        } else if(isDownSwipe){
            goToPreviousImage();
        }
}

const [numNext, setNumNext] = useState(0);

    if(loading) return <div>Loading...</div>;
    if(!challenges) return <div>Loading...</div>;
if (!isLoggedIn) {
  router.push('/')
}
else {
return (
  <>
  
  <CustomNavbar />
  <div style={{width:"100%"}} className="container flex flex-col items-center justify-center mx-auto h-screen">
            <h1 className="text-4xl pb-5">Open Challenges</h1>
        <div className="image-container h-3/4" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
<Image src={"http://localhost:4009/" + challenges[currentImageIndex].imagePath + ".jpg"} alt="Slider" width={3024} height={4032} className="object-scale-down max-h-full" onClick={goToNextImage} /> </div>
<Button color="primary" onClick={goToChallenge}>Attempt</Button>
        </div>
  </>
    
  );
}
}
