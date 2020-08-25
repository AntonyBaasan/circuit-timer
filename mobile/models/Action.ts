import { ActionType } from "./ActionType";

export type Action = {
    id: number;
    type: ActionType;
    seconds: number;
    isPlaying: boolean;
    image: string;
};
