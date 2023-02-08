"use strict";

/**
 * Shows subscribe to product form
 */
$(function () {
    const subscribeShowBtn = $(".subscribe-form-show-btn");

    subscribeShowBtn.on("click", function () {
        subscribeShowBtn.remove();
        const subscribeFormWrapper = $(".subscribe-product-wrapper");
        subscribeFormWrapper.removeClass("d-none");
    });
});
