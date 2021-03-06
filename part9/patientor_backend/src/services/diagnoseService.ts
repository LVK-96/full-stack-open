import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default { getDiagnoses };
