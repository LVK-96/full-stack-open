interface bmiValues {
  height: number;
  weight: number;
};

const parseBmiArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
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

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log(e.message);
}
