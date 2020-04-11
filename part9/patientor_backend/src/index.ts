import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.use('/api/ping', (_req, res) => {
  res.send('Pong');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
