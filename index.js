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

api.patch('/icecreams/{id}', (request) => { //PATCH your icecream
	let params = {
		TableName: 'icecreams',
		Item: {
			icecreamid: request.pathParams.id,
			name: request.body.name //your icecream name
		}
	};
	return dynamoDb.put(params).promise();
}, {success: 201});

api.delete('/icecreams/{id}', (request) => { //DELETE your icecream
	let id = request.pathParams.id;
	let params = {
		TableName: 'icecreams',
		Key: {
			icecreamid: id,
		}
	};

	return dynamoDb.delete(params).promise()
				   .then(() => {
					   return 'Deleted icecream with id "' + id + '"';
				   });
}, {success: 201});

module.exports = api;
