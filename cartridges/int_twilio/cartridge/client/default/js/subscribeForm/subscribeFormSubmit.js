"use strict";

const formValidation = require("base/components/formValidation");

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
                        if (!data.success) {
                            formValidation($form, data);
                            $notification.addClass("alert-danger");
                        } else {
                            $notification.addClass("alert-success");
                        }

                        $notification.text(data.notificationMessage);
                        $notification.delay(5000).fadeOut("slow");
                    },
                    error: function (e) {
                        $form.spinner().stop();
                        $notification.addClass("alert-danger");
                        $notification.text(data.notificationMessage);

                        $notification.delay(5000).fadeOut("slow");
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
