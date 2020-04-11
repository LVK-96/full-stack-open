import express from 'express';
import { getPatientsNonSensitive, addPatient } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(getPatientsNonSensitive());
});

router.post('/', (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = addPatient({ name, dateOfBirth, ssn, gender, occupation });
    res.status(201).json(newPatient);
  } catch (e) {
    res.status(400).json({"error": e.message});
  }
});


export default router;
