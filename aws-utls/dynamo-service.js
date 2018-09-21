"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
var docClient = new AWS.DynamoDB.DocumentClient({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com",
    convertEmptyValues: true,
    accessKeyId: 'AKIAJONIHSHNEEJKQFIA',
    secretAccessKey: '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',
});
var params = {
    TableName: 'session',
    Item: {
        "session_id": "somethingooo"
    }
};
docClient.put(params, function (err, data) {
    if (err) {
        console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    }
    else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
