import express from 'express';
import { getPatientsNonSensitive, addPatient } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(getPatientsNonSensitive());
});

router.post('/', (req, res) => {
  try {
    const newPatient = addPatient(req.body);
    res.status(201).json(newPatient);
  } catch (e) {
    res.status(400).json({"error": e.message});
  }
});


export default router;
