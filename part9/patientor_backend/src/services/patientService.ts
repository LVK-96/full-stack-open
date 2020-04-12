import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients.json';
import { Patient } from '../types';
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export const addPatient = (object: any): Patient => {
  const newEntry = toNewPatient(object);
  const newEntryWithId = { ...newEntry, id: uuidv4() };
  patients.push(newEntryWithId);
  return newEntryWithId;
};
