const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event, context, callback) => {
	const receiver = event['receiver'];
	const sender = event['sender'];
	const message = event['message'];

	// @TODO: Add distributed logging
	console.log("Sending message", message, "to receiver", receiver);

	const result = await sns.publish({
		Message: message,
		MessageAttributes: {
			'AWS.SNS.SMS.SMSType': {
				DataType: 'String',
				StringValue: 'Promotional'
			},
			'AWS.SNS.SMS.SenderID': {
				DataType: 'String',
				StringValue: sender
			},
		},
		PhoneNumber: receiver
	})
	.promise()
	.catch(err => {
		console.log("Sending failed", err);
		callback(err);
	});

	if (!data) {
		console.log("Sending failed");
		callback();
		return;
	}
	
	console.log("Sent message to", receiver);
	callback(null, data);
}