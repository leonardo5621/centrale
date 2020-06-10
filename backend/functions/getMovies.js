const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();

    var params = {
            TableName: process.env.tableName,
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type'
            },
            ExpressionAttributeValues: {
                ':type': 'movie',
            }
    }
    const result = await dynamoDb.query(params).promise();
    //console.log('result',result)

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
    }
}

