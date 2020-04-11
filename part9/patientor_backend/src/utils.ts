/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, NewPatient } from './types';

const isString = (entry: any): boolean => {
  return typeof entry === 'string' || entry instanceof String;
};

const isGender = (entry: any): entry is Gender => {
  return Object.values(Gender).includes(entry);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Not a valid name: ${name}`);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error(`Not a valid dateOfBirth: ${dateOfBirth}`);
  }

  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Not a valid ssn: ${ssn}`);
  }

  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Not a valid gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Not a valid occupation: ${occupation}`);
  }

  return occupation;
};

export const toNewPatient = (object: any) => {
  const newEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newEntry;
};
