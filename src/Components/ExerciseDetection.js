// import React, { useRef, useEffect, useState } from 'react';
// import { Pose } from '@mediapipe/pose';
// import { Camera } from '@mediapipe/camera_utils';
// import {
//   detectSquat,
//   detectPushUp,
//   detectLunge,
//   detectSidePlank,
//   detectLateralRaise,
//   detectSitUp
// } from '../utils/exerciseUtils';
// import { drawLandmarks } from '../utils/drawingUtils';
// import './ExerciseDetection.css';
// import Webcam from "react-webcam";

// const ExerciseDetection = ({ selectedExercise }) => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [feedback, setFeedback] = useState('');
//   const [repCount, setRepCount] = useState(0);
//   const [isDetecting, setIsDetecting] = useState(false);

//   const speakFeedback = (message) => {
//     const utterance = new window.SpeechSynthesisUtterance(message);
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     if (!isDetecting) return;

//     let camera = null;
//     const poseDetection = new Pose({
//       locateFile: (file) =>`https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
//     });
//     poseDetection.setOptions({
//       modelComplexity: 1,
//       smoothLandmarks: true,
//       enableSegmentation: false,
//       smoothSegmentation: false,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });

//     const onResults = (results) => {
//       const canvasCtx = canvasRef.current.getContext('2d');
//       const landmarks = results.poseLandmarks;

//       if (canvasRef.current && webcamRef.current && webcamRef.current.video) {
//         const videoWidth = webcamRef.current.video.videoWidth;
//         const videoHeight = webcamRef.current.video.videoHeight;
//         canvasRef.current.width = videoWidth;
//         canvasRef.current.height = videoHeight;

//         canvasCtx.save();
//         canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
//         canvasCtx.scale(-1, 1);
//         canvasCtx.translate(-videoWidth, 0);
//         canvasCtx.drawImage(results.image, 0, 0, videoWidth, videoHeight);

//         if (landmarks) {
//           drawLandmarks(canvasCtx, landmarks);

//           let formCheck;

//           switch (selectedExercise) {
//             case 'Squat':
//               formCheck = detectSquat(landmarks);
//               break;
//             case 'Push-up':
//               formCheck = detectPushUp(landmarks);
//               break;
//             case 'Lunge':
//               formCheck = detectLunge(landmarks);
//               break;
//             case 'Side Plank':
//               formCheck = detectSidePlank(landmarks);
//               break;
//             case 'Lateral Raise':
//               formCheck = detectLateralRaise(landmarks);
//               break;
//             case 'Sit-up':
//               formCheck = detectSitUp(landmarks);
//               break;
//             default:
//               formCheck = { label: '', feedback: '', count: 0, isCorrect: false };
//           }

//           if (formCheck) {
//             setFeedback(formCheck.feedback || '');
//             setRepCount(formCheck.count || 0);
//             if (formCheck.feedback) speakFeedback(formCheck.feedback);
//           }
//         }

//         canvasCtx.restore();
//       }
//     };

//     poseDetection.onResults(onResults);

//     // Wait for the video to be ready
//     const interval = setInterval(() => {
//       if (
//         webcamRef.current &&
//         webcamRef.current.video &&
//         webcamRef.current.video.readyState === 4
//       ) {
//         camera = new Camera(webcamRef.current.video, {
//           onFrame: async () => {
//             await poseDetection.send({ image: webcamRef.current.video });
//           },
//           width: 640,
//           height: 480,
//         });
//         camera.start();
//         clearInterval(interval);
//       }
//     }, 500);

//     return () => {
//       if (camera) camera.stop();
//       clearInterval(interval);
//     };
//   }, [isDetecting, selectedExercise]);

//   const containerStyle = {
//     position: "relative",
//     width: "100%",
//     maxWidth: "1280px",
//     height: "720px",
//     margin: "0 auto"
//   };

//   return (
//     <div style={containerStyle}>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         mirrored={true}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover"
//         }}
//         videoConstraints={{ 
//           width: 1280,
//           height: 720,
//           facingMode: "user"
//         }}
//       />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%"
//         }}
//       />
//       <div style={{
//         position: "absolute",
//         bottom: 16,
//         left: 16,
//         background: "white",
//         padding: 8,
//         borderRadius: 8,
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         zIndex: 10
//       }}>
//         <p style={{ margin: 0 }}>Feedback: {feedback}</p>
//         <p style={{ margin: 0 }}>Reps: {repCount}</p>
//       </div>
//       <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 20 }}>
//         {!isDetecting ? (
//           <button onClick={() => setIsDetecting(true)} className="control-button start">Start Detection</button>
//         ) : (
//           <button onClick={() => setIsDetecting(false)} className="control-button stop">Stop Detection</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExerciseDetection;




// import React, { useRef, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Pose } from '@mediapipe/pose';
// import { Camera } from '@mediapipe/camera_utils';
// import {
//   detectSquat,
//   detectPushUp,
//   detectLunge,
//   detectSidePlank,
//   detectLateralRaise,
//   detectSitUp
// } from '../utils/exerciseUtils';
// import { drawLandmarks } from '../utils/drawingUtils';
// import './ExerciseDetection.css';
// import Webcam from "react-webcam";

// const ExerciseDetection = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [feedback, setFeedback] = useState('');
//   const [repCount, setRepCount] = useState(0);
//   const [isDetecting, setIsDetecting] = useState(true); // Start detection automatically
//   const [exercise, setExercise] = useState(null);

//   useEffect(() => {
//     if (location.state?.exercise) {
//       setExercise(location.state.exercise);
//     } else {
//       // If no exercise data, redirect back to exercises
//       navigate('/exercises');
//     }
//   }, [location, navigate]);

//   const speakFeedback = (message) => {
//     const utterance = new window.SpeechSynthesisUtterance(message);
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     if (!isDetecting || !exercise) return;

//     let camera = null;
//     const poseDetection = new Pose({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
//     });

//     poseDetection.setOptions({
//       modelComplexity: 1,
//       smoothLandmarks: true,
//       enableSegmentation: false,
//       smoothSegmentation: false,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });

//     const [prevCorrect, setPrevCorrect] = useState(false);


//     const onResults = (results) => {
//       const canvasCtx = canvasRef.current.getContext('2d');
//       const landmarks = results.poseLandmarks;
//     if (formCheck) {
//       setFeedback(formCheck.feedback || '');
      
//       // Count rep on transition from incorrect to correct
//       if (formCheck.isCorrect && !prevCorrect) {
//         setRepCount((prev) => prev + 1);
//       }

//       setPrevCorrect(formCheck.isCorrect);
//       if (formCheck.feedback) speakFeedback(formCheck.feedback);
//     }

//       if (canvasRef.current && webcamRef.current && webcamRef.current.video) {
//         const videoWidth = webcamRef.current.video.videoWidth;
//         const videoHeight = webcamRef.current.video.videoHeight;
//         canvasRef.current.width = videoWidth;
//         canvasRef.current.height = videoHeight;

//         canvasCtx.save();
//         canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
//         canvasCtx.drawImage(results.image, 0, 0, videoWidth, videoHeight);

//         if (landmarks) {
//           drawLandmarks(canvasCtx, landmarks);

//           let formCheck;

//           switch (exercise.name) {
//             case 'Squats':
//               formCheck = detectSquat(landmarks);
//               break;
//             case 'Push-Ups':
//               formCheck = detectPushUp(landmarks);
//               break;
//             case 'Lunges':
//               formCheck = detectLunge(landmarks);
//               break;
//             case 'Side Plank':
//               formCheck = detectSidePlank(landmarks);
//               break;
//             case 'Side Lateral Raises':
//               formCheck = detectLateralRaise(landmarks);
//               break;
//             case 'Sit-Ups':
//               formCheck = detectSitUp(landmarks);
//               break;
//             default:
//               formCheck = { label: '', feedback: '', count: 0, isCorrect: false };
//           }

//           if (formCheck) {
//             setFeedback(formCheck.feedback || '');
//             setRepCount(formCheck.count || 0);
//             if (formCheck.feedback) speakFeedback(formCheck.feedback);
//           }
//         }

//         canvasCtx.restore();
//       }
//     };

//     poseDetection.onResults(onResults);

//     // Wait for the video to be ready
//     const interval = setInterval(() => {
//       if (
//         webcamRef.current &&
//         webcamRef.current.video &&
//         webcamRef.current.video.readyState === 4
//       ) {
//         camera = new Camera(webcamRef.current.video, {
//           onFrame: async () => {
//             await poseDetection.send({ image: webcamRef.current.video });
//           },
//           width: 1280,
//           height: 720,
//         });
//         camera.start();
//         clearInterval(interval);
//       }
//     }, 500);

//     return () => {
//       if (camera) camera.stop();
//       clearInterval(interval);
//     };
//   }, [isDetecting, exercise]);

//   const containerStyle = {
//     position: "relative",
//     width: "100%",
//     maxWidth: "1280px",
//     height: "720px",
//     margin: "0 auto"
//   };

//   if (!exercise) {
//     return <div className="loading">Loading...</div>;
//   }



//   return (
//     <div className="exercise-detection">
//       <div className="exercise-header">
//         <h2>{exercise.name}</h2>
//         <button className="back-button" onClick={() => navigate('/exercises')}>
//           ← Back to Exercises
//         </button>
//       </div>
      
//       <div style={containerStyle}>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           mirrored={true}
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover"
//           }}
//           videoConstraints={{ 
//             width: 1280,
//             height: 720,
//             facingMode: "user"
//           }}
//         />
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%"
//           }}
//         />
//         <div style={{
//           position: "absolute",
//           bottom: 16,
//           left: 16,
//           background: "white",
//           padding: 8,
//           borderRadius: 8,
//           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           zIndex: 10
//         }}>
//           <p style={{ margin: 0 }}>Feedback: {feedback}</p>
//           <p style={{ margin: 0 }}>Reps: {repCount}</p>
//         </div>
//         <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 20 }}>
//           {!isDetecting ? (
//             <button onClick={() => setIsDetecting(true)} className="control-button start">Start Detection</button>
//           ) : (
//             <button onClick={() => setIsDetecting(false)} className="control-button stop">Stop Detection</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExerciseDetection;



import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import {
  detectSquat,
  detectPushUp,
  detectLunge,
  detectSidePlank,
  detectLateralRaise,
  detectSitUp
} from '../utils/exerciseUtils';
import { drawLandmarks } from '../utils/drawingUtils';
import './ExerciseDetection.css';
import Webcam from "react-webcam";

const ExerciseDetection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [feedback, setFeedback] = useState('');
  const [repCount, setRepCount] = useState(0);
  const [isDetecting, setIsDetecting] = useState(true);
  const [exercise, setExercise] = useState(null);
  const [prevCorrect, setPrevCorrect] = useState(false); // <-- moved here

  useEffect(() => {
    if (location.state?.exercise) {
      setExercise(location.state.exercise);
    } else {
      navigate('/exercises');
    }
  }, [location, navigate]);

  const speakFeedback = (message) => {
    const utterance = new window.SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isDetecting || !exercise) return;

    let camera = null;

    const poseDetection = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    poseDetection.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const onResults = (results) => {
      const canvasCtx = canvasRef.current.getContext('2d');
      const landmarks = results.poseLandmarks;

      if (canvasRef.current && webcamRef.current && webcamRef.current.video) {
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
        canvasCtx.drawImage(results.image, 0, 0, videoWidth, videoHeight);

        if (landmarks) {
          drawLandmarks(canvasCtx, landmarks);

          let formCheck = { label: '', feedback: '', count: 0, isCorrect: false };

          switch (exercise.name) {
            case 'Squats':
              formCheck = detectSquat(landmarks);
              break;
            case 'Push-Ups':
              formCheck = detectPushUp(landmarks);
              break;
            case 'Lunges':
              formCheck = detectLunge(landmarks);
              break;
            case 'Side Plank':
              formCheck = detectSidePlank(landmarks);
              break;
            case 'Side Lateral Raises':
              formCheck = detectLateralRaise(landmarks);
              break;
            case 'Sit-Ups':
              formCheck = detectSitUp(landmarks);
              break;
            default:
              break;
          }

          // Count rep on transition from incorrect to correct
          if (formCheck.isCorrect && !prevCorrect) {
            setRepCount((prev) => prev + 1);
          }

          setPrevCorrect(formCheck.isCorrect);
          setFeedback(formCheck.feedback || '');

          if (formCheck.feedback) {
            speakFeedback(formCheck.feedback);
          }
        }

        canvasCtx.restore();
      }
    };

    poseDetection.onResults(onResults);

    const interval = setInterval(() => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        camera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            await poseDetection.send({ image: webcamRef.current.video });
          },
          width: 1280,
          height: 720,
        });
        camera.start();
        clearInterval(interval);
      }
    }, 500);

    return () => {
      if (camera) camera.stop();
      clearInterval(interval);
    };
  }, [isDetecting, exercise, prevCorrect]);

  const containerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "1280px",
    height: "720px",
    margin: "0 auto"
  };

  if (!exercise) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="exercise-detection">
      <div className="exercise-header">
        <h2>{exercise.name}</h2>
        <button className="back-button" onClick={() => navigate('/exercises')}>
          ← Back to Exercises
        </button>
      </div>
      
      <div style={containerStyle}>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          videoConstraints={{ 
            width: 1280,
            height: 720,
            facingMode: "user"
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        />
        <div style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          background: "white",
          padding: 8,
          borderRadius: 8,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 10
        }}>
          <p style={{ margin: 0 }}>Feedback: {feedback}</p>
          <p style={{ margin: 0 }}>Reps: {repCount}</p>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 20 }}>
          {!isDetecting ? (
            <button onClick={() => setIsDetecting(true)} className="control-button start">Start Detection</button>
          ) : (
            <button onClick={() => setIsDetecting(false)} className="control-button stop">Stop Detection</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetection;
