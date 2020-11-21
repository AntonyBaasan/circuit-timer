import { ExerciseType } from "./ExcerciseType";

export type Exercise = {
    id: string;
    type: ExerciseType;
    seconds: number;
    image?: string;
};
