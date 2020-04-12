import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getPatientsNonSensitive());
});

router.get('/:id', (req, res) => {
  const patientNonSensitive = patientService.getPatientById(req.params.id);
  if (patientNonSensitive)
    res.status(200).json(patientNonSensitive);
  else
    res.status(404).json({});
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientService.addPatient(req.body);
    res.status(201).json(newPatient);
  } catch (e) {
    res.status(400).json({"error": e.message});
  }
});


export default router;
