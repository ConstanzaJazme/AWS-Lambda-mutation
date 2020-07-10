/**
 * A Lambda function that logs the payload received from SNS.
 */

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
function snsRequest(mensaje){
    var params = {
        message: mensaje,
        TopicArn: ''
    };
    var publishTextPromise = new AWS.SNS({apiVersion: "2010-03-31"}).publish(params).promise();
}

exports.snsPayloadLoggerHandler = async (event, context, callback) => {
    // All log statements are written to CloudWatch by default. For more information, see
    // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html
    snsRequest("Enviando mensaje")
    console.info(event);
}