export interface User {
    id: string;
    email: string;
    sleepStreak: number;
}

export interface SleepDetails {
    sleep_userId: string;
    endedAt: number;
}