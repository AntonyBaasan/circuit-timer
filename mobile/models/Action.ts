import { ActionType } from "./ActionType";

export type Action = {
    id: string;
    type: ActionType;
    seconds: number;
    isPlaying: boolean;
    image?: string;
};
