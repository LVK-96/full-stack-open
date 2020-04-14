interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface BaseEntryWithDiagnosisCodes extends BaseEntry {
  diagnosisCodes?: string[];
}

interface HospitalEntry extends BaseEntryWithDiagnosisCodes {
  type: 'Hospital';
  discharge: Discharge;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: number;
}

interface OccupationalHealthcareEntry extends BaseEntryWithDiagnosisCodes {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewHealtCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewEntry = NewHospitalEntry | NewHealtCheckEntry | NewOccupationalEntry;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
