import * as faceapi from 'face-api.js';

let lastDetectionTime = 0; // Track the last time emotion detection was logged
const DETECTION_INTERVAL = 30000; // 30 seconds in milliseconds

export const loadFaceApiModels = async () => {
    const MODEL_URL = '/models'; // Place your models in the `public/models` directory.
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
};

export const detectEmotions = async (videoElement) => {
    const currentTime = new Date().getTime();

    // Only log emotions if 30 seconds have passed since the last log
    if (currentTime - lastDetectionTime >= DETECTION_INTERVAL) {
        const detections = await faceapi
            .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        if (detections.length > 0) {
            detections.forEach((detection) => {
                console.log('Face detected');
                console.log('Emotions:', detection.expressions);
            });
        } else {
            console.log('No face detected');
        }

        lastDetectionTime = currentTime; // Update last detection time
    }
};

export const startEmotionDetection = (videoElement) => {
    // Start emotion detection periodically
    let detectionInterval = setInterval(async () => {
        await detectEmotions(videoElement);
    }, 1000); // Check every second, but log every 30 seconds

    // Clear the interval when it's no longer needed, e.g., when the video stops playing
    videoElement.onpause = () => {
        clearInterval(detectionInterval);
    };
    videoElement.onended = () => {
        clearInterval(detectionInterval);
    };
};
