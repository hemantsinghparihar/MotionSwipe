import React, { useEffect, useRef, useState } from 'react';
import * as handTrack from 'handtrackjs';

function HandTrackComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isVideoRunning, setIsVideoRunning] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      const modelParams = {
        flipHorizontal: true,
        maxNumBoxes: 20,
        iouThreshold: 0.5,
        scoreThreshold: 0.6,
      };

      const model = await handTrack.load(modelParams);
      setModel(model);
      console.log("Model loaded");
    };

    loadModel();

    return () => {
      if (model) model.dispose();
    };
  }, []);

  const startVideo = () => {
    handTrack.startVideo(videoRef.current).then((status) => {
      if (status) {
        console.log("Video started");
        setIsVideoRunning(true);
        videoRef.current.addEventListener('loadeddata', onVideoLoaded);
      } else {
        console.log("Please enable video");
      }
    });
  };

  const onVideoLoaded = () => {
    console.log("Video loaded");
    runDetection();
    videoRef.current.removeEventListener('loadeddata', onVideoLoaded);
  };

  const runDetection = () => {
    if (model && isVideoRunning) {
      model.detect(videoRef.current).then((predictions) => {
        console.log("Predictions:", predictions);
        model.renderPredictions(predictions, canvasRef.current, canvasRef.current.getContext("2d"), videoRef.current);
        if (videoRef.current.paused || !isVideoRunning) return;
        requestAnimationFrame(runDetection);
      });
    }
  };

  const stopVideo = () => {
    handTrack.stopVideo(videoRef.current);
    setIsVideoRunning(false);
  };

  return (
    <div className="relative">
      <div >
        <video
          ref={videoRef}
          className=""
          autoPlay
          playsInline
          muted
        />
        <canvas 
          ref={canvasRef} 
          
        />
      </div>
      {!isVideoRunning ? (
        <button onClick={startVideo} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Start Video</button>
      ) : (
        <button onClick={stopVideo} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Stop Video</button>
      )}
    </div>
  );
}

export default HandTrackComponent;










// import React, { useEffect, useRef, useState } from 'react';
// import * as handTrack from 'handtrackjs';

// function HandTrackComponent() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [model, setModel] = useState(null);
//   const [isVideoRunning, setIsVideoRunning] = useState(false);

//   useEffect(() => {
//     const loadModel = async () => {
//       const modelParams = {
//         flipHorizontal: true,
//         maxNumBoxes: 20,
//         iouThreshold: 0.5,
//         scoreThreshold: 0.6,
//       };

//       const model = await handTrack.load(modelParams);
//       setModel(model);
//       console.log("Model loaded");
//     };

//     loadModel();

//     return () => {
//       if (model) model.dispose();
//     };
//   }, []);

//   const startVideo = () => {
//     handTrack.startVideo(videoRef.current).then((status) => {
//       if (status) {
//         console.log("Video started");
//         setIsVideoRunning(true);
//         videoRef.current.addEventListener('loadeddata', onVideoLoaded);
//       } else {
//         console.log("Please enable video");
//       }
//     });
//   };

//   const onVideoLoaded = () => {
//     console.log("Video loaded");
//     runDetection();
//     videoRef.current.removeEventListener('loadeddata', onVideoLoaded);
//   };

//   const runDetection = () => {
//     if (model && isVideoRunning) {
//       model.detect(videoRef.current).then((predictions) => {
//         console.log("Predictions:", predictions);
//         model.renderPredictions(predictions, canvasRef.current, canvasRef.current.getContext("2d"), videoRef.current);
//         if (videoRef.current.paused || !isVideoRunning) return;
//         requestAnimationFrame(runDetection);
//       });
//     }
//   };

//   const stopVideo = () => {
//     handTrack.stopVideo(videoRef.current);
//     setIsVideoRunning(false);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="relative">
//         <video 
//           ref={videoRef} 
//           className="w-[640px] h-[480px]" 
//           style={{ display: isVideoRunning ? 'block' : 'none' }}
//         />
//         <canvas 
//           ref={canvasRef} 
//           className="absolute top-0 left-0 w-[640px] h-[480px]"
//         />
//       </div>
//       {!isVideoRunning ? (
//         <button onClick={startVideo} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Start Video</button>
//       ) : (
//         <button onClick={stopVideo} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Stop Video</button>
//       )}
//     </div>
//   );
// }

// export default HandTrackComponent;










// import React, { useEffect, useRef, useState } from 'react';
// import * as handTrack from 'handtrackjs';

// function HandTrackComponent() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [model, setModel] = useState(null);
//   const [isVideoRunning, setIsVideoRunning] = useState(false);

//   useEffect(() => {
//     const loadModel = async () => {
//       const modelParams = {
//         flipHorizontal: true,
//         maxNumBoxes: 20,
//         iouThreshold: 0.5,
//         scoreThreshold: 0.6,
//       };

//       const model = await handTrack.load(modelParams);
//       setModel(model);
//       console.log("Model loaded");
//     };

//     loadModel();

//     return () => {
//       if (model) model.dispose();
//     };
//   }, []);

//   const startVideo = () => {
//     handTrack.startVideo(videoRef.current).then((status) => {
//       if (status) {
//         console.log("Video started");
//         setIsVideoRunning(true);
//         videoRef.current.addEventListener('loadeddata', onVideoLoaded);
//       } else {
//         console.log("Please enable video");
//       }
//     });
//   };

//   const onVideoLoaded = () => {
//     console.log("Video loaded");
//     runDetection();
//     videoRef.current.removeEventListener('loadeddata', onVideoLoaded);
//   };

//   const runDetection = () => {
//     if (model && isVideoRunning) {
//       model.detect(videoRef.current).then((predictions) => {
//         console.log("Predictions:", predictions);
//         model.renderPredictions(predictions, canvasRef.current, canvasRef.current.getContext("2d"), videoRef.current);
//         if (videoRef.current.paused || !isVideoRunning) return;
//         requestAnimationFrame(runDetection);
//       });
//     }
//   };

//   const stopVideo = () => {
//     handTrack.stopVideo(videoRef.current);
//     setIsVideoRunning(false);
//   };

//   return (
//     <div>
//       <video ref={videoRef} style={{ display: 'none' }} />
//       <canvas ref={canvasRef} style={{ width: '640px', height: '480px' }} />
//       {!isVideoRunning ? (
//         <button onClick={startVideo}>Start Video</button>
//       ) : (
//         <button onClick={stopVideo}>Stop Video</button>
//       )}
//     </div>
//   );
// }

// export default HandTrackComponent;