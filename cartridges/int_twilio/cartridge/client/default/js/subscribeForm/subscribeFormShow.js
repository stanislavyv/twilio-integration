"use strict";

/**
 * Shows subscribe to product form
 */
$(function () {
    const subscribeSections = $(".subscribe-product-wrapper");

    $(subscribeSections).each(function (index, element) {
        const currSubscribeSection = $(element);

        const currShowBtn = currSubscribeSection
            .children(".subscribe-form-show-btn")
            .first();

        currShowBtn.on("click", function () {
            currShowBtn.remove();

            const currSubscribeFormWrapper = currSubscribeSection
                .children(".subscribe-product-form-wrapper")
                .first();

            currSubscribeFormWrapper.removeClass("d-none");
        });
    });
});
