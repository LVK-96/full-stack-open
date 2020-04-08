import express = require('express');
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
