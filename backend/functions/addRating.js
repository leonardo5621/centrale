const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');
module.exports.handle = async event => {
    const data = JSON.parse(event.body);

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    const item = {
        type: 'rating',
        uuid: uuid.v1(),
        userId : data.userId,
        movieId : data.movieId,
        rate : data.rate,
        createdAt: Date.now()
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: item,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        body: JSON.stringify(item),
    }
}

