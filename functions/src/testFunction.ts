import { setTimeout } from "timers/promises";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), {});

export const handler = async () => {
    for (const i of Array(12).fill(0)) {
        await setTimeout(500);
        const output = await db.send(new PutCommand({
            TableName: "Sleep",
            Item: {
                sleep_userId: `sleep_user1`,
                endedAt: Date.now(),
            }
        }))
    }
}