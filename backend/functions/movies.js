const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();
    const limit = 3
    var params = {}
    if(event.pathParameters && event.pathParameters.lastElementUuid){
        params = {
            TableName: process.env.tableName,
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type'
            },
            ExpressionAttributeValues: {
                ':type': 'movie',
            },
            ExclusiveStartKey : {
                'uuid' : event.pathParameters.lastElementUuid,
                'type' : 'movie'
            },
            Limit : limit,
            ScanIndexForward: "true"

        }
    }
    else {
        params = {
            TableName: process.env.tableName,
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type'
            },
            ExpressionAttributeValues: {
                ':type': 'movie',
            },
            Limit : limit
        }
    }
    const result = await dynamoDb.query(params).promise();
    return {
        statusCode: 200,
        headers : {
                'Access-Control-Allow-Origin' : 'http://localhost:3000',
                'Access-Control-Allow-Credentials' : 'true'
        },
        body: JSON.stringify({
            movies : result.Items,
            lastElementUuid : result.LastEvaluatedKey ? result.LastEvaluatedKey.uuid : null
        })
    }
}

