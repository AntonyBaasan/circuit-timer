import { Action } from './Action';

export type Exercise = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  authorId?: string;
  exercisePackageId: string;
  repetition: number;
  actions: Action[];
  image?: string;
};


