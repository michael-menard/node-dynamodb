const AWS = require('aws-sdk');
const DataMapper = require('@aws/dynamodb-data-mapper').DataMapper;

let config = {

}

if (process.env.NODE_ENV === 'development') {
    config.region = 'us-east-1'
    config.endpoint = 'http://localhost:8000'
    config.accessKey = 'fakeMyKeyId'
    config.secretKey = 'fakeSecretAccessKey'
} else {
    config.region = 'us-east-1'
    config.accessKey = ''
    config.secretKey = ''
}

const client = new AWS.DynamoDB(config);
const mapper = new DataMapper({ client });

module.exports = mapper;
