"use strict";
const base = require("base/product/detail");

/**
 * Shows/ Hides add to card button and subscribe form based on product availability
 * @param {Boolean} isAvailable
 */
function productAvailabilityActionsTrigger(isAvailable) {
    if (isAvailable) {
        $(".product-available-price-cart").removeClass("d-none");
        $(".subscribe-product-wrapper").addClass("d-none");
    } else {
        $(".product-available-price-cart").addClass("d-none");
        $(".subscribe-product-wrapper").removeClass("d-none");
    }
}

base.updateAvailability = function () {
    $("body").on("product:updateAvailability", function (e, response) {
        $("div.availability", response.$productContainer)
            .data("ready-to-order", response.product.readyToOrder)
            .data("available", response.product.available);

        $(".availability-msg", response.$productContainer)
            .empty()
            .html(response.message);

        productAvailabilityActionsTrigger(response.product.available);

        if ($(".global-availability").length) {
            var allAvailable = $(".product-availability")
                .toArray()
                .every(function (item) {
                    return $(item).data("available");
                });

            var allReady = $(".product-availability")
                .toArray()
                .every(function (item) {
                    return $(item).data("ready-to-order");
                });

            $(".global-availability")
                .data("ready-to-order", allReady)
                .data("available", allAvailable);

            $(".global-availability .availability-msg")
                .empty()
                .html(
                    allReady
                        ? response.message
                        : response.resources.info_selectforstock
                );
        }
    });
};

module.exports = base;
