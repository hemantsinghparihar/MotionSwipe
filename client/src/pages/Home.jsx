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













import React, {useRef} from 'react'
import EmblaCarousel from '../components/EmblaCarousel'
import { handGestureDetection } from '../utils/handGesture'
import HandTrackComponent from '../utils/HandTrackComponent';

function Home() {
  const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())



  return (
    <div className='w-full h-full min-h-[100vh] border-b-4  '>

      <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
      
    </div>
  )
}

export default Home
