import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), {});

export const handler = async (event: any) => {
    await db.send(new PutCommand({
        TableName: "Sleep",
        Item: {
            sleep_userId: `sleep_user1`,
            startedAt: event.startTime,
            endedAt: Date.now(),
        }
    }))

    await db.send(new UpdateCommand({
        TableName: "Users",
        Key: {
            id: "user1",
        },
        UpdateExpression: "ADD sleepStreak :val",
        ExpressionAttributeValues: {
            ":val": 1,
        },
    }));
}