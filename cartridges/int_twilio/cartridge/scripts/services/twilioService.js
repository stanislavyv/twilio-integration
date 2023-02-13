"use strict";

const SERVICE_NAME = "http.form.twilio.sendSms";
const PHONE_NUMBERS_PATTERN = /To=(\+?d+)?[\s*\d+]"/;
const TWILIO_PHONE_NUMBER = "+13855038602";

const LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

const twilioService = LocalServiceRegistry.createService(SERVICE_NAME, {
    createRequest(svc, inputData) {
        svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
        svc.setRequestMethod("POST");

        return `To=${inputData.To}&From=${TWILIO_PHONE_NUMBER}&Body=${inputData.Body}`;
    },
    parseResponse(svc, client) {
        let result;

        try {
            result = JSON.parse(client.text);
        } catch (e) {
            result = client.text;
        }

        return result;
    },
    filterLogMessage(msg) {
        return msg.replace(PHONE_NUMBERS_PATTERN, "To=**********");
    },
});

module.exports = twilioService;
