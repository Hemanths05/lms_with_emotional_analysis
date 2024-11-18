import dynamic from "next/dynamic";

const FaceDetector = dynamic(() => import("../components/FaceDetector"), {
  ssr: false, 
});

const FaceDetectionPage = () => {
  return (
    <div>
      <h1>Face Detection</h1>
      <FaceDetector />
    </div>
  );
};

export default FaceDetectionPage;
