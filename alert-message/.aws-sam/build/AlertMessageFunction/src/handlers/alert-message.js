/**
 * A Lambda function that send a message.  From: https://github.com/SamWSoftware/ServerlessYoutubeSeries.git
 */
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const Responses = require('../Responses');
const sns = new aws.SNS()

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
        await sns.setSMSAttributes(AttributeParams).promise();
        await sns.publish(messageParams).promise();
        return Responses._200({ message: 'Texto enviado' });
    } catch (error) {
        console.log('error', error);
        return Responses._400({ message: JSON.stringify(err) });
    }
}

exports.EmailAlertHandler = async (event, context) => {
    const body = JSON.parse(event.body);

    if (!body || !body.email || !body.message) {
        return Responses._400({ message: 'missing email or messsage from the body' });
    }

    const messageParams = {
        Message: body.message,
        Email: body.email,
    };

    try {
        await sns.publish(params).promise()
        return Responses._200({ message: 'Texto enviado' });
    } catch (error) {
        console.log('error', error);
        return Responses._400({ message: JSON.stringify(err) });
    }
}