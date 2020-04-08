interface ExerciseParams {
  target: number;
  exerciseHours: Array<number>;
}

export interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseExerciseArguments = (target: string, exercises: Array<string>): ExerciseParams => {
  let parsedTarget: number;
  if (!isNaN(Number(target))) {
    parsedTarget = Number(target);
  } else {
    throw new Error('Provided values were not numbers!');
  }

  const exerciseHours: Array<number> = [];
  exercises.forEach((exercise: string) => {
    if (!isNaN(Number(exercise))) {
      exerciseHours.push(Number(exercise));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  return { 'target': parsedTarget , exerciseHours };
};

export const calculateExercises = (exerciseHours: Array<number>, target: number): ExerciseReport => {
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
