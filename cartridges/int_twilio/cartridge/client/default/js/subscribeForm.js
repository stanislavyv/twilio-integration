var processInclude = require("base/util");

$(document).ready(function () {
    processInclude(require("./subscribeForm/subscribeFormShow"));
    processInclude(require("./subscribeForm/subscribeFormSubmit"));
});
