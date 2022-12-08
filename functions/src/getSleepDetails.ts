import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), {});

export const handler = async (event: any) => {
    const result = await db.send(new QueryCommand({
        TableName: "Sleep",
        KeyConditionExpression: "sleep_userId = :userId",
        ExpressionAttributeValues: {
            ":userId": `sleep_${event.pathParameters.userId}`,
        },
        Limit: 7,
        ScanIndexForward: false,
    }));

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    }
}