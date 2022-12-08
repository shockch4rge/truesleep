declare module NodeJS {
    interface ProcessEnv {
        readonly HOST_ENDPOINT: string;
        readonly CLIENT_ID: string;
    }
}