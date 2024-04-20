
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {Button, ButtonGroup} from '@nextui-org/react';
// ImageSlider.js
export default function HomePage() {
    // synchronously calls api to get an array of chalenge ids
   const [challenges, setChallenges] = useState([]); 
    const [loading, setLoading] = useState(true);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? challenges.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % challenges.length;
      return newIndex;
    });
        setNumNext(numNext + 1);
  };

    function apiChallengesCall() {
 fetch("http://localhost:4009/images")
        .then(res => res.json())
        .then(data => {
            setChallenges(data);
                setLoading(false);
                console.log(data);
        });

    }

    useEffect(() => {
        // keydown up and down arrow keys
        const handleKeyDown = (e) => {
            if(e.key === 'ArrowDown'){
                goToNextImage();
            } else if(e.key === 'ArrowUp'){
                goToPreviousImage();
            }
        }
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
return (
    <div className="container flex flex-col items-center justify-center mx-auto h-screen">
            <h1 className="text-4xl pb-5">Open Challenges</h1>
        <div className="image-container h-3/4" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
<Image src={"http://localhost:4009/" + challenges[currentImageIndex].imagePath} alt="Slider" width={3024} height={4032} className="object-scale-down max-h-full" /> </div>
<Button color="primary">Attempt</Button>
        </div>
  );
}
