/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient, Discharge, SickLeave, NewEntry } from './types';

const isString = (entry: any): boolean => {
  return typeof entry === 'string' || entry instanceof String;
};

const isNumber = (entry: any): boolean => {
  return typeof entry === 'number' || entry instanceof Number;
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

const parseDate = (date: any): string => {
  if (!date|| !isString(date)) {
    throw new Error(`Not a valid date: ${date}`);
  }

  return date;
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

const parseEntryType = (type: any): string => {
  if (!type || !isString(type)) {
    throw new Error(`Not a valid entry type: ${type}`);
  }

  return type;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Not a valid specialist: ${specialist}`);
  }

  return specialist;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Not a valid description: ${description}`);
  }

  return description;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Not a valid criteria: ${criteria}`);
  }

  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  return { date: parseDate(discharge.date), criteria: parseCriteria(discharge.criteria) }
};

const parseDiagnoseCode = (code: any): string => {
  if (!code || !isString(code)) {
    throw new Error(`Not a valid code: ${code}`);
  }

  return code;
};

const parseDiagnosisCodes = (codes: any): string[] => {
  return codes.map((c: any) => parseDiagnoseCode(c));
};

const parseHealtCheckRating = (rating: any): number => {
  if (!rating || !isNumber(rating)) {
    throw new Error(`Not a valid rating: ${rating}`);
  }

  return rating;
};

const parseEmployerName = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw new Error(`Not a valid employer: ${employer}`);
  }

  return employer;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  return { startDate: parseDate(sickLeave.startDate), endDate: parseDate(sickLeave.endDate) };
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};

export const toNewEntry = (object: any): NewEntry => {
    const base = {
      type: parseEntryType(object.type),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description)
    };

    let diagnosisCodes;
    switch(base.type) {
      case 'Hospital':
        if (object.diagnosisCodes) {
          diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
        return {
          ...base,
          type: 'Hospital',
          discharge: parseDischarge(object.discharge),
          ...(!!diagnosisCodes) && {diagnosisCodes}
        };
      case 'HealthCheck':
        return { ...base, type: 'HealthCheck', healthCheckRating: parseHealtCheckRating(object.healthCheckRating) };
      case 'OccupationalHealthcare':
        if (object.diagnosisCodes) {
          diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }

        let sickLeave;
        if (object.sickLeave) {
          sickLeave = parseSickLeave(object.sickLeave);
        }

        return {
          ...base,
          type: 'OccupationalHealthcare',
          employerName: parseEmployerName(object.employerName),
          ...(!!diagnosisCodes) && {diagnosisCodes},
          ...(!!sickLeave) && {sickLeave}
        };
      default:
        throw new Error(`Invalid entry type: ${base.type}`);
    }
};
