import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import patientData from '../../data/patients';
import { Patient, PublicPatient } from '../types';
import { toNewPatient } from '../utils';

const patients = patientData;

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getPatientByIdNonSensitive = (id: string): PublicPatient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return _.omit(patient, ['ssn', 'entries']);
};

const getPatientsNonSensitive = (): PublicPatient[] => {
  return patients.map((p) => _.omit(p, ['ssn', 'entries']));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const addPatient = (object: any): Patient => {
  const newEntry = toNewPatient(object);
  const newEntryWithId = { ...newEntry, id: uuidv4() };
  patients.push(newEntryWithId);
  return newEntryWithId;
};

export default {
  getPatientById,
  getPatientByIdNonSensitive,
  getPatientsNonSensitive,
  addPatient
};
