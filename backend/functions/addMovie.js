const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');
module.exports.handle = async event => {
    const data = JSON.parse(event.body);

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    const item = {
        type: 'movie',
        uuid: uuid.v1(),
        name: data.name,
        picture: data.picture,
        year: data.year,
        actors: data.actors,
        realizer: data.realizer,
        createdAt: Date.now(),
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: item,
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    }
}

