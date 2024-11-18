import "@tensorflow/tfjs"; // TensorFlow.js for browser use
import * as faceapi from "face-api.js/dist/face-api.min.js";


export const loadModels = async (modelPath) => {
  await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
};

export const detectFaceExpressions = async (videoElement) => {
  return await faceapi
    .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();
};
