"use strict";

/**
 * shows a notification element
 * @param {JQuery} $notification - notification element
 * @param {Boolean} success - true or false
 * @param {String} message - notificationMessage
 */
function fireNotification($notification, success, message) {
    console.log(success);

    if (success) {
        $notification.removeClass("alert-danger");
        $notification.addClass("alert-success");
    } else {
        $notification.removeClass("alert-success");
        $notification.addClass("alert-danger");
    }

    $notification.text(message);
    $notification.show();

    $notification.delay(5000).fadeOut("slow");
}

function sendSubscriptionData() {
    $(function () {
        const $allSubscribeForms = $(".subscribe-product-form");

        // Iterate over all forms in case there are several like in a product set
        $allSubscribeForms.each(function (index, element) {
            const $currSubscribeForm = $(element);

            // Modify submit event for each form
            $currSubscribeForm.on("submit", function (e) {
                const $form = $(this);
                e.preventDefault();
                const url = $form.attr("action");

                const $notification = $currSubscribeForm.next(
                    ".subscribe-product-result"
                );

                $form.spinner().start();
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    data: $form.serialize(),
                    success: function (data) {
                        $form.spinner().stop();
                        fireNotification(
                            $notification,
                            data.success,
                            data.notificationMessage
                        );
                    },
                    error: function (e) {
                        $form.spinner().stop();
                        fireNotification(
                            $notification,
                            false,
                            data.notificationMessage
                        );
                    },
                });

                return false;
            });
        });
    });
}

module.exports = {
    sendSubscriptionData,
};
