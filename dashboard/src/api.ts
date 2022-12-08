import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import auth from "../auth.json";
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
        baseUrl: auth.AWS_ENDPOINT,
        headers: {
            "X-Api-Key": auth.API_KEY,
        }
    }),

    endpoints: b => ({
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        setAlarm: b.mutation<void, void>({
            query: () => ({
                url: "/set-alarm"
            })
        }),

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
    }),
});

export const { useSetAlarmMutation, useResetStreakMutation, useLazyTestQuery, useGetSleepDetailsQuery } = api;
export default api;