interface BmiValues {
  height: number;
  weight: number;
}

export const parseBmiArguments = (height: string, weight: string): BmiValues => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = 0.01 * height;
  const bmi = weight / (heightInMeters * heightInMeters);

  let msg: string;
  if (bmi > 40) {
    msg = "Obese Class III (Very severely obese)";
  } else if (bmi > 35) {
    msg = "Obese Class II (Severely obese)";
  } else if (bmi > 30) {
    msg = "Obese Class I (Moderately obese)";
  } else if (bmi > 25) {
    msg = "Overweight";
  } else if (bmi > 18.5) {
    msg = "Normal (healthy weight)";
  } else if (bmi > 16) {
    msg = "Underweight";
  } else if (bmi > 15) {
    msg = "Severely underweight";
  } else {
    msg = "Very severely underweight";
  }

  return msg;
};
