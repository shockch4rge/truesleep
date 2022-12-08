import { configureStore } from "@reduxjs/toolkit";

import api from "./api";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: gDM => gDM().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;