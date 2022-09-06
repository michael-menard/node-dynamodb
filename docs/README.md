

```shell
docker run -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
```


starting local dynamo db

```shell
npm i -g dynamodb-admin

DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin
```
