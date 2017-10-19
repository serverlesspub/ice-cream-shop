const ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk');

var api = new ApiBuilder(),
		dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/icecreams', function (request) { // SAVE your icecream
		var parameters = {
			TableName: 'icecreams',
				Item: {
					icecreamid: request.body.icecreamId,
					name: request.body.name // your icecream name
			}
		};
		return dynamoDb.put(parameters).promise(); // returns dynamo result
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/icecreams', function (request) { // GET all users
	return dynamoDb.scan({ TableName: 'icecreams' }).promise()
	   .then(response => response.Items)
});

module.exports = api;
