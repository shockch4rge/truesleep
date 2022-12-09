import { IoTDataPlaneClient, PublishCommand } from "@aws-sdk/client-iot-data-plane";

const iot = new IoTDataPlaneClient({});

export const handler = async (props: any) => {
    const { startTime, wakeUpTime } = props;

    const output = await iot.send(new PublishCommand({
        topic: "alarm/set",
        payload: Buffer.from(JSON.stringify({
            startTime,
            wakeUpTime,
        })),
    }));
}