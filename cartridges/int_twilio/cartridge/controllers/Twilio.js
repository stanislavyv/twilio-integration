"use strict";

/**
 * @namespace Twilio
 */

const server = require("server");
const consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
const csrfProtection = require("*/cartridge/scripts/middleware/csrf");

const Resource = require("dw/web/Resource");

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

        const phoneNumber = subscribeForm.phoneNumber;
        const productId = subscribeForm.productId;

        if (!phoneNumber.valid || !productId.valid) {
            res.json({
                success: false,
                notificationMessage: Resource.msg(
                    "label.submit.result.notification.error",
                    "subscribeOutOfStock",
                    null
                ),
            });

            return next();
        }

        const SubscribeToProductHelpers = require("*/cartridge/scripts/subscribeToProductHelpers");

        try {
            const currObject = SubscribeToProductHelpers.getObjectInstance(
                productId.htmlValue
            );
            SubscribeToProductHelpers.addPhoneNumber(
                currObject,
                phoneNumber.htmlValue
            );

            res.json({
                success: true,
                notificationMessage: Resource.msg(
                    "label.submit.result.notification.success",
                    "subscribeOutOfStock",
                    null
                ),
            });
        } catch (e) {
            res.json({
                success: false,
                notificationMessage: Resource.msg(
                    "label.submit.result.notification.error",
                    "subscribeOutOfStock",
                    null
                ),
            });
        }

        return next();
    }
);

module.exports = server.exports();
