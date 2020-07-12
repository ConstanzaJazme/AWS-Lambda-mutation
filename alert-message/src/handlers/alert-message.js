const axios = require('axios')
/**
 * A Lambda function that send a SMS.  From: https://github.com/SamWSoftware/ServerlessYoutubeSeries.git
 */
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const Responses = require('../Responses');
const url = process.env.IFTTT_URL;

exports.PhoneAlertHandler = async (event, context) => {
    const config = {
        method: 'get',
        url: url
    }

    try {
        const request = await axios(config);
        return Responses._200({ message: 'Texto enviado' });
    } catch (err) {
        console.log(err);
        return err;
    }
}

/**
 * A Lambda function that send a EMAIL.  From: https://github.com/weibeld/sam-hello-world
 */
exports.EmailAlerthandler = async function(event, context) {
    const params = {
      Message: "Hola desde AWS",
      Subject: 'Notificación desde FallDetector',
      TopicArn: process.env.SNS_TOPIC_ARN
    };

    try {
      await SNS.publish(params).promise()
      return Responses._200({ message: 'Texto enviado' });
    } catch(error) {
        return Responses._400({ message: JSON.stringify(error) });
    }
};