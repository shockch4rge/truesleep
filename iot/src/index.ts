import "dotenv/config";

import awsIot from "aws-iot-device-sdk";
import schedule, { Job } from "node-schedule";

class Device {
    public startTime?: number;
    public wakeUpTime?: number;
    public retries = 0;
    private device = new awsIot.device({
        keyPath: "certs/private.pem.key",
        certPath: "certs/certificate.pem.crt",
        caPath: "certs/AmazonRootCA1.pem",
        clientId: process.env.CLIENT_ID,
        host: process.env.HOST_ENDPOINT,
    });

    private clock?: Job;
    private timer?: NodeJS.Timer;

    public constructor() {
        this.device.on("connect", () => {
            console.log("Connected to AWS IoT");
            this.device.subscribe(IotTopics.FaceInputResult);
            this.device.subscribe(IotTopics.SetAlarm);
        });

        this.device.on("message", (topic: string, payload) => {
            switch (topic) {
                case IotTopics.FaceInputResult:
                    this.handleFaceInputResult(payload);
                case IotTopics.SetAlarm:
                    this.setAlarm(payload);
            }
        });
    }

    public handleFaceInputResult(payload: any) {
        const { statusCode, body } = JSON.parse(payload) as FaceInputResultPayload;
        console.log("Face detection result:", body);

        // if we failed to detect a face, we start a timer for 10 minutes. once this timer is up,
        // we reset the user's sleep streak. otherwise, we continue
        if (body !== "FACE_DETECTED") {
            this.timer ??= setTimeout(() => {
                this.resetSleepStreak();
            }, 600_000);

            // limit the number of retries to 3
            if (this.retries >= 3) {
                console.log("Face detection failed 3 times, resetting sleep streak");
                this.resetSleepStreak();
                this.resetDevice();
                return;
            }

            setTimeout(() => {
                this.detectFace();
                this.retries += 1;
            }, 10_000)

            return;
        }

        // if we detected a face, we stop the timer and register the sleep event
        this.resetDevice();
        this.device.publish(IotTopics.RegisterSleep, JSON.stringify({
            startedAt: Date.now(),
            endedAt: this.wakeUpTime,
        }));
    }

    public detectFace() {
        // in theory, we call this every time the webcam detects a face
        this.device.publish(IotTopics.FaceInput, JSON.stringify({
            // empty payload because we use an existing mock image in an S3 bucket
            // we put an image here otherwise
        }));
    }

    public resetSleepStreak() {
        this.device.publish(IotTopics.ResetSleepStreak, JSON.stringify({
            userId: "user1",
        }));
    }

    public setAlarm(payload: any) {
        const { startTime, wakeUpTime } = JSON.parse(payload) as SetAlarmPayload;
        this.startTime = startTime;
        this.wakeUpTime = wakeUpTime;

        this.clock = schedule.scheduleJob(new Date(wakeUpTime), () => {
            console.log("Wake up!");
            this.detectFace();
        });
    }

    public resetDevice() {
        this.retries = 0;
        clearTimeout(this.timer);
        this.clock = undefined;
    }
}

const IotTopics = {
    SetAlarm: "alarm/set",
    ResetSleepStreak: "reset-sleep",
    FaceInput: "face-input",
    FaceInputResult: "face-input/result",
    RegisterSleep: "register-sleep",
} as const;

interface FaceInputResultPayload {
    statusCode: number;
    body: "FACE_DETECTED" | "FACE_UNDETECTED" | "MULTIPLE_FACES_DETECTED" | "EYES_CLOSED";
}

interface SetAlarmPayload {
    startTime: number;
    wakeUpTime: number;
}


const device = new Device();
// device.detectFace();