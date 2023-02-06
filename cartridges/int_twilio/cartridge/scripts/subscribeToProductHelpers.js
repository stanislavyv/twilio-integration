const CustomObjectMgr = require("dw/object/CustomObjectMgr");
const Transaction = require("dw/system/Transaction");

const CUSTOM_OBJECT_TYPE = "ProductOutOfStockSubscription";

/**
 * Gets the object instance if it exists, else creates a new instance
 * @param {String} productId
 * @returns {dw.object.CustomObject | null}
 */
function getObjectInstance(productId) {
    let currObject = CustomObjectMgr.getCustomObject(
        CUSTOM_OBJECT_TYPE,
        productId
    );

    if (!currObject) {
        Transaction.wrap(() => {
            currObject = CustomObjectMgr.createCustomObject(
                CUSTOM_OBJECT_TYPE,
                productId
            );
        });
    }

    return currObject;
}

/**
 * Adds a new phone number to the current object
 * @param {dw.object.CustomObject} currObject
 * @param {String} phoneNumber
 */
function addPhoneNumber(currObject, phoneNumber) {
    if (!currObject.custom.customerPhoneNumbers) {
        Transaction.wrap(() => {
            currObject.custom.customerPhoneNumbers = `${phoneNumber}`;
        });
    } else {
        let customerPhoneNumbers = currObject.custom.customerPhoneNumbers
            .toString()
            .split(", ");

        if (!customerPhoneNumbers.includes(phoneNumber)) {
            customerPhoneNumbers.push(phoneNumber);

            Transaction.wrap(() => {
                currObject.custom.customerPhoneNumbers =
                    customerPhoneNumbers.join(", ");
            });
        }
    }
}

module.exports = {
    getObjectInstance,
    addPhoneNumber,
};
