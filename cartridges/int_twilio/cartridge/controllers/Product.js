"use strict";

const server = require("server");
const page = module.superModule;

server.extend(page);

const csrfProtection = require("*/cartridge/scripts/middleware/csrf");

server.append("Show", csrfProtection.generateToken, function (req, res, next) {
    const subscribeToProductForm = server.forms.getForm("subscribeToProduct");
    subscribeToProductForm.clear();

    const viewData = res.getViewData();

    viewData.forms = { subscribeToProductForm };

    if (customer.profile && customer.profile.phoneHome) {
        viewData.phoneNumber = customer.profile.phoneHome;
    } else {
        viewData.phoneNumber = "";
    }

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
