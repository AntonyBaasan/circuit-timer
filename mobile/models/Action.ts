export type Action = {
    id: number;
    type: 'work' | 'rest';
    seconds: number;
    isPlaying: boolean;
};
