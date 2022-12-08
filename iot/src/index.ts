import "dotenv/config";

import awsIot from "aws-iot-device-sdk";

class Device {
    public wakeUpTime = 0;
    private device = new awsIot.device({
        keyPath: "certs/private.pem.key",
        certPath: "certs/certificate.pem.crt",
        caPath: "certs/AmazonRootCA1.pem",
        clientId: process.env.CLIENT_ID,
        host: process.env.HOST_ENDPOINT,
    });

    public constructor() {
        this.device.on("connect", () => {
            console.log("Connected to AWS IoT");
            this.device.subscribe(IotTopics.FaceInputResult);
        });

        this.device.on("message", (topic: string, payload) => {
            switch (topic) {
                case IotTopics.FaceInputResult:
                    this.handleFaceInputResult(payload);
            }
        });
    }

    public detectFace() {
        // in theory, we call this every time the webcam detects a face
        this.device.publish(IotTopics.FaceInput, JSON.stringify({
            // empty payload because we use an existing mock image in an S3 bucket
            // we put an image here otherwise
        }));
    }

    public handleFaceInputResult(payload: any) {
        const { statusCode, body } = JSON.parse(payload) as FaceInputResultPayload;
        console.log("Face detection result:", body);

        this.device.publish(IotTopics.RegisterSleep, JSON.stringify({}));
    }

    public resetSleepStreak() {
        this.device.publish(IotTopics.ResetSleepStreak, JSON.stringify({
            userId: "user1",
        }));
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


const device = new Device();

device.detectFace();


