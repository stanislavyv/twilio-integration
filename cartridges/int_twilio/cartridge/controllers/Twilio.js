"use strict";

/**
 * @namespace Twilio
 */

const server = require("server");
const consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
const csrfProtection = require("*/cartridge/scripts/middleware/csrf");

/**
 * Twilio-Subscribe : This endpoint is called when the subscribe to product form is submitted
 * @name Base/Twilio-Subscribe
 * @function
 * @memberof Twilio
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - csrf_token - a CSRF token
 * @param {category} - sensitive
 * @param {serverfunction} - post
 */
server.post(
    "Subscribe",
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        const subscribeForm = server.forms.getForm("subscribeToProduct");

        const phoneNumber = subscribeForm.phoneNumber.htmlValue;
        const productId = subscribeForm.productId.htmlValue;

        const SubscribeToProductHelpers = require("*/cartridge/scripts/subscribeToProductHelpers");

        try {
            const currObject =
                SubscribeToProductHelpers.getObjectInstance(productId);
            SubscribeToProductHelpers.addPhoneNumber(currObject, phoneNumber);
        } catch (e) {
            const URLUtils = require("dw/web/URLUtils");
            return res.redirect(URLUtils.url("Error-Start"));
        }

        res.json({ msg: "Success" });

        next();
    }
);

module.exports = server.exports();
