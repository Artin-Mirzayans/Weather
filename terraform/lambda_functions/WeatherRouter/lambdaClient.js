const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const lambdaClient = new LambdaClient({ region: "us-east-1" });

module.exports = {
  lambdaClient,
  InvokeCommand,
};
