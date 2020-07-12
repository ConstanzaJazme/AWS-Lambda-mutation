/**
 * A Lambda function that send a SMS.  From: https://github.com/SamWSoftware/ServerlessYoutubeSeries.git
 */
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const Responses = require('../Responses');

exports.PhoneAlertHandler = async (event, context) => {
    const body = JSON.parse(event.body);

    if (!body || !body.phoneNumber || !body.message) {
        return Responses._400({ message: 'missing phone number or messsage from the body' });
    }

    const AttributeParams = {
        attributes: {
            DefaultSMSType: 'Promotional',
        },
    };

    const messageParams = {
        Message: body.message,
        PhoneNumber: body.phoneNumber,
    };

    try {
        await SNS.setSMSAttributes(AttributeParams).promise();
        await SNS.publish(messageParams).promise();
        return Responses._200({ message: 'Texto enviado' });
    } catch (error) {
        console.log('error', error);
        return Responses._400({ message: JSON.stringify(error) });
    }
}

/**
 * A Lambda function that send a EMAIL.  From: https://github.com/weibeld/sam-hello-world
 */
exports.EmailAlerthandler = async function(event, context) {
    const params = {
      Message: event.message,
      Subject: 'Notificación desde FallDetector',
      TopicArn: process.env.SNS_TOPIC_ARN
    };

    try {
      await SNS.publish(params).promise()
      return Responses._200({ message: 'Texto enviado' });
    } catch(err) {
        return Responses._400({ message: JSON.stringify(error) });
    }
};