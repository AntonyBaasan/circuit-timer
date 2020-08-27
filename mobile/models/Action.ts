import { ActionType } from "./ActionType";

export type Action = {
    id: string;
    type: ActionType;
    seconds: number;
    image?: string;
};
