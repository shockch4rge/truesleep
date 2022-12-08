import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), {});

export const handler = async () => {
    const output = await db.send(new PutCommand({
        TableName: "Users",
        Item: {
            id: "123",
            sleepStreak: 0,
        }
    }))

    console.log(output);

}