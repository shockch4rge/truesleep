import { IoTDataPlaneClient, PublishCommand } from "@aws-sdk/client-iot-data-plane";

const iot = new IoTDataPlaneClient({
});

export const handler = async () => {
    const output = await iot.send(new PublishCommand({
        topic: "alarm/set",
        payload: Buffer.from(JSON.stringify({ deez: "nuts" })),
    }));
}