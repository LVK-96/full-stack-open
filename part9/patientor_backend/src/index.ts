import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
