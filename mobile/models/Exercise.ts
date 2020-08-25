import { Action } from './Action';

export type Exercise = {
  exercisePackageId: string;
  repetition: number;
  actions: Action[];
};
