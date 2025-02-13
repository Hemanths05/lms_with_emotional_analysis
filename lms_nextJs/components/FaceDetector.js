import React from "react";
import * as faceapi from "face-api.js";

let detectionInterval;
let originalURL;
let pokiTab;

export const startFaceDetection = async (currentPath) => {
  const MODEL_URL = "/models";
  originalURL = currentPath;

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

  const videoElement = document.createElement("video");
  videoElement.style.display = "none";
  document.body.appendChild(videoElement);

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play();

      detectionInterval = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          console.log("Detected Emotions:", expressions);

          if (expressions.sad > 0.5 || expressions.angry>0.5 || expressions.fearful>0.5) {
            console.log("User is sad. Opening Poki...");
            navigateToWebsite("https://poki.com/en/online");
          }
        }
      }, 1000);
    })
    .catch((err) => console.error("Error accessing camera:", err));
};

const navigateToWebsite = (url) => {
  clearInterval(detectionInterval);
  
  const currentWindow = window;
  
  pokiTab = window.open(url, '_blank');
  
  if (pokiTab) {
    pokiTab.focus();
  }

  setTimeout(() => {
    if (pokiTab) {
      pokiTab.close(); 
    }
    
    currentWindow.focus();
    
    startFaceDetection(originalURL);
  }, 30000);
};

export const stopFaceDetection = () => {
  clearInterval(detectionInterval);
  if (pokiTab) {
    pokiTab.close();
  }
};