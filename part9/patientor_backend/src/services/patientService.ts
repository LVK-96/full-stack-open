import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients.json';
import { Patient, NewPatient } from '../types';
import { toNewPatient } from '../utils';

const patients: Array<Patient> = patientData as Array<Patient>;

export const getPatientsNonSensitive = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const addPatient = (newPatient: NewPatient): Patient => {
  const newEntry = toNewPatient(newPatient);
  const newEntryWithId = { ...newEntry, id: uuidv4() };
  patients.push(newEntryWithId);
  return newEntryWithId;
};
