require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const body = process.env.TWILIO_MESSAGE;
const from = process.env.TWILIO_SEND;
const to = process.env.TWILIO_RECIEVE;

client.messages
    .create({
        body: body,
        from: from,
        to: to
    })
    .then(message => console.log(message.sid));

    