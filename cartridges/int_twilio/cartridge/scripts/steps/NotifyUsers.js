"use strict";

const SEPARATOR = ", ";

/**
 * Notifies all customers subscribed to a product if it's in stock and deletes the custom objects
 */
exports.execute = function () {
    const twilioService = require("~/cartridge/scripts/twilioService");
    const SubscribeToProductHelpers = require("~/cartridge/scripts/subscribeToProductHelpers");
    const ProductMgr = require("dw/catalog/ProductMgr");

    const iterator = SubscribeToProductHelpers.getAllObjectInstances();

    let currObject;
    while (iterator.hasNext()) {
        currObject = iterator.next();
        const currProduct = ProductMgr.getProduct(currObject.custom.productId);

        if (currProduct.availabilityModel.isInStock()) {
            const customerPhoneNumbers =
                currObject.custom.customerPhoneNumbers.split(SEPARATOR);

            customerPhoneNumbers.forEach((phoneNumber) => {
                twilioService.call({
                    To: phoneNumber,
                    Body: `${currProduct.name} is back in stock!`,
                });
            });

            SubscribeToProductHelpers.deleteObjectInstance(currObject);
        }
    }
};
