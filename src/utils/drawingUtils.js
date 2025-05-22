// src/utils/drawingUtils.js

// export const drawLandmarks = (ctx, landmarks) => {
//   ctx.fillStyle = 'red';
//   landmarks.forEach(landmark => {
//     const x = landmark.x * ctx.canvas.width;
//     const y = landmark.y * ctx.canvas.height;
//     ctx.beginPath();
//     ctx.arc(x, y, 5, 0, 2 * Math.PI);
//     ctx.fill();
//   });
// };




// export const drawLandmarks = (ctx, landmarks) => {
//   ctx.fillStyle = "rgb(0, 255, 0)";
//   ctx.strokeStyle = "white";
//   ctx.lineWidth = 2;
//   ctx.font = "12px Arial";
//   ctx.textAlign = "center";

//   landmarks.forEach((landmark, index) => {
//     const x = landmark.x * ctx.canvas.width;
//     const y = landmark.y * ctx.canvas.height;

//     // Draw circle
//     ctx.beginPath();
//     ctx.arc(x, y, 4, 0, 2 * Math.PI);
//     ctx.fill();

//     // Draw index number as label
//     ctx.fillStyle = "yellow";
//     ctx.fillText(index.toString(), x, y - 8); // text thoda upar
//     ctx.fillStyle = "rgb(0, 255, 0)"; // restore fill for next circle
//   });
// };



// drawingUtils.js
import { POSE_CONNECTIONS } from '@mediapipe/pose';

export const drawLandmarks = (ctx, landmarks) => {
  if (!landmarks || landmarks.length === 0) return;

  // Set styles
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'aqua';
  ctx.fillStyle = 'lime';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';

  // Draw connections
  for (let connection of POSE_CONNECTIONS) {
    const [startIdx, endIdx] = connection;
    const start = landmarks[startIdx];
    const end = landmarks[endIdx];
    if (start && end) {
      ctx.beginPath();
      ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
      ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
      ctx.stroke();
    }
  }

  // Draw points and numbers
  landmarks.forEach((landmark, index) => {
    const x = landmark.x * ctx.canvas.width;
    const y = landmark.y * ctx.canvas.height;

    // Dot
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Index label (optional)
    ctx.fillStyle = 'yellow';
    ctx.fillText(index.toString(), x, y - 6);
    ctx.fillStyle = 'lime';
  });
};



