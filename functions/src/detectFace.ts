import { IoTDataPlaneClient, PublishCommand } from "@aws-sdk/client-iot-data-plane";
import { DetectFacesCommand, RekognitionClient } from "@aws-sdk/client-rekognition";

const rekog = new RekognitionClient({});
const iot = new IoTDataPlaneClient({});

const publish = (payload: any) => {
    return iot.send(new PublishCommand({
        topic: "face-input/result",
        payload: Buffer.from(JSON.stringify(payload)),
    }));
}

export const handler = async () => {
    const { FaceDetails = [] } = await rekog.send(new DetectFacesCommand({
        Image: {
            S3Object: {
                Bucket: "face-detection-s3",
                Name: "man_closed_eyes.jpg"
            }
        },
        Attributes: ["ALL"],
    }));

    if (FaceDetails.length <= 0) {
        console.log("No faces detected");
        return publish({
            statusCode: 400,
            body: "FACE_UNDETECTED",
        })
    }

    if (FaceDetails.length > 1) {
        console.log("Multiple faces detected");
        return publish({
            statusCode: 400,
            body: "MULTIPLE_FACES_DETECTED",
        })
    }

    const face = FaceDetails[0];

    if (face.Confidence! < 90) {
        console.log("Face not confident enough");
        return publish({
            statusCode: 400,
            body: "FACE_UNDETECTED",
        })
    }

    const hasEyesClosed = face.EyesOpen?.Confidence! > 90 && face.EyesOpen!.Value === false;

    if (hasEyesClosed) {
        console.log("Eyes are closed");
        return publish({
            statusCode: 200,
            body: "EYES_CLOSED",
        })
    }

    return publish({
        statusCode: 200,
        body: "FACE_DETECTED",
    })
}
