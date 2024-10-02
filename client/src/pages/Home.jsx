// import React from 'react'
// import EmblaCarousel from '../components/EmblaCarousel'
// import HandTrackComponent from '../utils/HandTrackComponent';

// function Home() {
//   const OPTIONS = { loop: true }
//   const SLIDE_COUNT = 5
//   const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

//   return (

//     // <div className='w-full h-full min-h-[100vh] border-b-4  '>

//     //    <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
//     //    <div className='w-[100vw] h-[100vh] border-b-red-400'>
//     //     <HandTrackComponent />
//     //    </div>
       
//     //  </div>

//     <div className='w-full h-full min-h-[100vh] border-b-4'>
//       <div className="flex flex-col md:flex-row">
//         <div className="w-full md:w-1/2">
//           <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
//         </div>
//         {/* <div className="w-full h-[100vh]">
//           <HandTrackComponent />
//         </div> */}
//       </div>
//       <div className="w-full h-[100vh]">
//           <HandTrackComponent />
//         </div>
//     </div>
//   )
// }

// export default Home






import React, {useRef,useEffect} from 'react'
import EmblaCarousel from '../components/EmblaCarousel'
import { handGestureDetection } from '../utils/handGesture'
import HandTrackComponent from '../utils/HandTrackComponent';
import * as handTrack from 'handtrackjs';

function Home() {
  const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const videoRef = useRef(null);
    const canvasRef = useRef(null);
    let model;


    useEffect(() => {
      const modelParams = {
          flipHorizontal: true,
          maxNumBoxes: 1,
          scoreThreshold: 0.6,
      };

      // Load the model
      handTrack.load(modelParams).then(loadedModel => {
          model = loadedModel;
          startVideo();
      });

      const startVideo = () => {
          handTrack.startVideo(videoRef.current).then(status => {
              if (status) {
                  console.log("Video started");
                  runDetection();
              }
          });
      };

      const runDetection = () => {
          model.detect(videoRef.current).then(predictions => {
              model.renderPredictions(predictions, canvasRef.current, canvasRef.current.getContext('2d'), videoRef.current);
              requestAnimationFrame(runDetection); // Continuously detect
          });
      };
  }, []);



  



  return (
    <div className='w-full h-full min-h-[100vh] border-b-4  '>

      <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
      <video ref={videoRef}  style={{width:"600", height:"500"}} autoPlay />
            <canvas ref={canvasRef} style={{width:"600", height:"500"}} ></canvas>
      
    </div>
  )
}

export default Home








// import React, {useRef} from 'react'
// import EmblaCarousel from '../components/EmblaCarousel'
// import { handGestureDetection } from '../utils/handGesture'
// import HandTrackComponent from '../utils/HandTrackComponent';

// function Home() {
//   const OPTIONS = { loop: true }
// const SLIDE_COUNT = 5
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())



//   return (
//     <div className='w-full h-full min-h-[100vh] border-b-4  '>

//       <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
      
//     </div>
//   )
// }

// export default Home
