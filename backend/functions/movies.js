const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const limit = 10
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
                'uuid' : { "S" : event.pathParameters.lastElementUuid}
            },
            Limit : limit
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
        body: JSON.stringify({
            movies : result.Items,
            lastElementUuid : result.LastEvaluatedKey ? result.LastEvaluatedKey.uuid : null
        })
    }
}

