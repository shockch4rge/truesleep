import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), {});
const sns = new SNSClient({});

export const handler = async () => {
    await db.send(new PutCommand({
        TableName: "Users",
        Item: {
            id: "user1",
            sleepStreak: 0,
        }
    }))

    await sns.send(new PublishCommand({
        TopicArn: "arn:aws:sns:us-east-1:585508862556:reset-sleep-streak",
        Message: "Reset your sleep streak to 0! Let's try again."
    }))

    console.log(`Reset sleep streak for user1`);
}