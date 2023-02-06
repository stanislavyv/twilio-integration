"use strict";

module.exports = function (element, message) {
    var infoHtml = // SEE WHAT TYPE OF ALERT: INFO/ SUCCESS/ DANGER??
        '<div class="alert alert-info alert-dismissible ' +
        'fade show" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        "</button>" +
        message +
        "</div>";

    $(element).append(infoHtml);
};
