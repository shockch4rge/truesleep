import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import auth from "../auth.json";
import { RootState } from "./store";
import { SleepDetails } from "./types";

interface User {
    id: string;
    email: string;
    sleepStreak: number;
}

const api = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_ENDPOINT,
        headers: {
            "X-Api-Key": process.env.API_KEY,
        },

        // baseUrl: auth.API_ENDPOINT,
        // headers: {
        //     "X-Api-Key": auth.API_KEY,
        // }
    }),

    endpoints: b => ({
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        test: b.query<any, void>({
            query: () => ({
                url: "/test",
            }),
        }),

        registerUser: b.query<any, any>({
            query: () => ({
                url: "/users/register",
            }),
        }),

        getUser: b.query<User, User["id"]>({
            query: id => ({
                url: `/users/${id}`,
            }),
        }),

        resetStreak: b.mutation<any, User["id"]>({
            query: id => ({
                url: `/users/${id}/reset-streak`,
                method: "put",
                body: {},
            }),
        }),

        getSleepDetails: b.query<SleepDetails[], User["id"]>({
            query: id => ({
                url: `/users/${id}`,
            }),
        }),

        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        setAlarm: b.mutation<void, { userId: string; startTime: number; wakeUpTime: number }>({
            query: ({ userId, startTime, wakeUpTime}) => ({
                url: `/users/${userId}/set-alarm`,
                method: "put",
                body: {
                    startTime,
                    wakeUpTime,
                }
            })
        })
    }),
});

export const { useSetAlarmMutation, useResetStreakMutation, useLazyTestQuery, useGetSleepDetailsQuery } = api;
export default api;