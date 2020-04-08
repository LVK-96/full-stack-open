interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const res: Array<number> = [];
  args.slice(2).forEach((arg: string) => {
    if (!isNaN(Number(arg))) {
      res.push(Number(arg));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  return res;
};

const calculateExercises = (exerciseHours: Array<number>, target: number): ExerciseReport => {
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

try {
  const exerciseHours = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours.slice(1), exerciseHours[0]));
} catch (e) {
  console.log(e.message);
}
