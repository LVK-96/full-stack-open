interface exerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = (exerciseHours: Array<number>, target: number): exerciseReport => {
  const daysExercised = exerciseHours.filter((a: number) => a !== 0).length;
  const exerciseSum = exerciseHours.reduce((a: number, b: number) => a + b);
  const avgExerciseTime = exerciseSum / exerciseHours.length;

  let rating: number;
  let description: string;
  if (avgExerciseTime < 0.5 * target) {
    rating = 1;
    description = "Säälittävää";
  } else if (avgExerciseTime < target) {
    rating = 2;
    description = "Yrittäisit edes";
  } else {
    rating = 3;
    description = "Ihan hyvä 3/5";
  }

  return {
    periodLength: exerciseHours.length,
    trainingDays: daysExercised,
    success: avgExerciseTime >= target,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: avgExerciseTime
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
