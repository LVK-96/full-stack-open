import express = require('express');
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
import { calculateExercises, parseExerciseArguments, ExerciseReport } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseBmiArguments(req.query.height.toString(), req.query.weight.toString());
    const msg: string = calculateBmi(height, weight);
    res.status(200).json({
      'weight': weight,
      'height': height,
      'bmi': msg
    });
  } catch (e) {
    res.status(400).json({'error': 'malformatted parameters'});
  }
});

app.post('/exercises', (req, res) => {
  try {
    if (!(req.body.target && req.body.daily_exercises)) {
      res.status(400).json({'error': 'parameters missing'}).end();
    }

    const { target, exerciseHours } = parseExerciseArguments(req.body.target, req.body.daily_exercises);
    const report: ExerciseReport = calculateExercises(exerciseHours, target);
    res.status(200).json(report);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({'error': 'malformatted parameters'});
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
