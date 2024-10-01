// src/utils/handGesture.js
import { Hands } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";

export const handGestureDetection = (onGestureDetected) => {
  const videoElement = document.getElementsByClassName("input_video")[0];

  const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  hands.setOptions({
    maxNumHands: 1,
    minDetectionConfidence: 0.8,
    minTrackingConfidence: 0.8,
  });

  hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const handOpen = detectOpenPalm(results.multiHandLandmarks[0]);
      onGestureDetected(handOpen ? "open" : "closed");
    }
  });

  const camera = new cam.Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480,
  });

  camera.start();
};

// Simple logic to detect an open palm (you can refine this)
const detectOpenPalm = (landmarks) => {
  // Example logic to detect if the hand is open
  // You can use the distance between thumb and pinky finger for detection
  const thumbTip = landmarks[4];
  const pinkyTip = landmarks[20];

  // Calculate distance between thumb and pinky
  const distance = Math.sqrt(
    Math.pow(thumbTip.x - pinkyTip.x, 2) + Math.pow(thumbTip.y - pinkyTip.y, 2)
  );

  return distance > 0.2; // Adjust this threshold based on your needs
};
