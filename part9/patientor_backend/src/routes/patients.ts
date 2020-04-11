import express from 'express';
import { getPatientsNonSensitive } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(getPatientsNonSensitive());
});

export default router;
