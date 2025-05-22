// Helper function to calculate angle between three points
const calculateAngle = (a, b, c) => {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
};

// Helper function to check if a point is within a certain range
const isWithinRange = (value, min, max) => {
  return value >= min && value <= max;
};

// Squat detection
export const detectSquat = (landmarks) => {
  if (!landmarks) return null;

  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];
  const leftAnkle = landmarks[27];
  const rightHip = landmarks[24];
  const rightKnee = landmarks[26];
  const rightAnkle = landmarks[28];

  const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
  const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

  let feedback = '';
  let isCorrect = false;

  if (isWithinRange(leftKneeAngle, 70, 110) && isWithinRange(rightKneeAngle, 70, 110)) {
    feedback = 'Good squat position!';
    isCorrect = true;
  } else if (leftKneeAngle < 70 || rightKneeAngle < 70) {
    feedback = 'Go deeper!';
  } else {
    feedback = 'Keep your back straight and go lower';
  }

  return {
    label: 'Squat',
    feedback,
    isCorrect,
    count: isCorrect ? 1 : 0
  };
};

// Push-up detection
export const detectPushUp = (landmarks) => {
  if (!landmarks) return null;

  const leftShoulder = landmarks[11];
  const leftElbow = landmarks[13];
  const leftWrist = landmarks[15];
  const rightShoulder = landmarks[12];
  const rightElbow = landmarks[14];
  const rightWrist = landmarks[16];

  const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
  const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

  let feedback = '';
  let isCorrect = false;

  if (isWithinRange(leftElbowAngle, 70, 110) && isWithinRange(rightElbowAngle, 70, 110)) {
    feedback = 'Good push-up position!';
    isCorrect = true;
  } else if (leftElbowAngle > 110 || rightElbowAngle > 110) {
    feedback = 'Go lower!';
  } else {
    feedback = 'Keep your body straight';
  }

  return {
    label: 'Push-up',
    feedback,
    isCorrect,
    count: isCorrect ? 1 : 0
  };
};

// Lunge detection
export const detectLunge = (landmarks) => {
  if (!landmarks) return null;

  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];
  const leftAnkle = landmarks[27];
  const rightHip = landmarks[24];
  const rightKnee = landmarks[26];
  const rightAnkle = landmarks[28];

  const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
  const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

  let feedback = '';
  let isCorrect = false;

  if ((isWithinRange(leftKneeAngle, 80, 100) && isWithinRange(rightKneeAngle, 80, 100)) ||
      (isWithinRange(leftKneeAngle, 80, 100) && isWithinRange(rightKneeAngle, 80, 100))) {
    feedback = 'Good lunge position!';
    isCorrect = true;
  } else {
    feedback = 'Keep your back straight and maintain proper form';
  }

  return {
    label: 'Lunge',
    feedback,
    isCorrect,
    count: isCorrect ? 1 : 0
  };
};

// Side Plank detection
export const detectSidePlank = (landmarks) => {
  if (!landmarks) return null;

  const leftShoulder = landmarks[11];
  const leftHip = landmarks[23];
  const leftAnkle = landmarks[27];
  const rightShoulder = landmarks[12];
  const rightHip = landmarks[24];
  const rightAnkle = landmarks[28];

  const leftBodyAngle = calculateAngle(leftShoulder, leftHip, leftAnkle);
  const rightBodyAngle = calculateAngle(rightShoulder, rightHip, rightAnkle);

  let feedback = '';
  let isCorrect = false;

  if (isWithinRange(leftBodyAngle, 160, 180) || isWithinRange(rightBodyAngle, 160, 180)) {
    feedback = 'Good side plank position!';
    isCorrect = true;
  } else {
    feedback = 'Keep your body straight and aligned';
  }

  return {
    label: 'Side Plank',
    feedback,
    isCorrect,
    count: isCorrect ? 1 : 0
  };
};

// Lateral Raise detection
export const detectLateralRaise = (landmarks) => {
  if (!landmarks) return null;

  const leftShoulder = landmarks[11];
  const leftElbow = landmarks[13];
  const leftWrist = landmarks[15];
  const rightShoulder = landmarks[12];
  const rightElbow = landmarks[14];
  const rightWrist = landmarks[16];

  const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
  const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

  let feedback = '';
  let isCorrect = false;

  if (isWithinRange(leftArmAngle, 70, 110) && isWithinRange(rightArmAngle, 70, 110)) {
    feedback = 'Good lateral raise position!';
    isCorrect = true;
  } else {
    feedback = 'Keep your arms straight and raise them to shoulder level';
  }

  return {
    label: 'Lateral Raise',
    feedback,
    isCorrect,
    count: isCorrect ? 1 : 0
  };
};

// Sit-up detection
export const detectSitUp = (landmarks) => {
  if (!landmarks) return null;

  const leftShoulder = landmarks[11];
  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];
  const rightShoulder = landmarks[12];
  const rightHip = landmarks[24];
  const rightKnee = landmarks[26];

  const leftBodyAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
  const rightBodyAngle = calculateAngle(rightShoulder, rightHip, rightKnee);

  let feedback = '';
  let isCorrect = false;

  if (isWithinRange(leftBodyAngle, 70, 110) || isWithinRange(rightBodyAngle, 70, 110)) {
    feedback = 'Good sit-up position!';
    isCorrect = true;
  } else {
    feedback = 'Keep your back straight and maintain proper form';
  }

  return {
    label: 'Sit-up',
    feedback,
    isCorrect,
    count: isCorrect ? 1 : 0
  };
};














