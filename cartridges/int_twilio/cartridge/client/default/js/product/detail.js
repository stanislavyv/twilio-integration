"use strict";
const base = require("base/product/detail");

/**
 * Changes the value of the hidden input field for product id
 * @param {JQuery} $productContainer
 * @param {String} productId
 */
function changePidInputValue($productContainer, productId) {
    const $subscribeProductWrapper = $productContainer
        .find(".subscribe-product-wrapper")
        .first();

    if (
        $subscribeProductWrapper.length > 0 &&
        !$subscribeProductWrapper.hasClass("d-none")
    ) {
        const $pidInput = $subscribeProductWrapper
            .find(".input-product-id")
            .first();
        $pidInput.val(productId);
    }
}

/**
 * Shows/ Hides add to card button and subscribe form based on product availability
 * @param {dw.catalog.Product} product
 * @param {JQuery} $productContainer
 */
function productAvailabilityActionsTrigger(product, $productContainer) {
    if (product.readyToOrder) {
        if (product.available) {
            $productContainer
                .find(".product-available-price-cart")
                .removeClass("d-none");
            $productContainer
                .find(".subscribe-product-wrapper")
                .addClass("d-none");
        } else {
            $productContainer
                .find(".product-available-price-cart")
                .addClass("d-none");
            $productContainer
                .find(".subscribe-product-wrapper")
                .removeClass("d-none");
        }
    }
}

base.updateAttribute = function () {
    $("body").on("product:afterAttributeSelect", function (e, response) {
        if ($(".product-detail>.bundle-items").length) {
            response.container.data("pid", response.data.product.id);
            response.container
                .find(".product-id")
                .text(response.data.product.id);
        } else if ($(".product-set-detail").eq(0)) {
            response.container.data("pid", response.data.product.id);
            response.container
                .find(".product-id")
                .text(response.data.product.id);
        } else {
            $(".product-id").text(response.data.product.id);
            $('.product-detail:not(".bundle-item")').data(
                "pid",
                response.data.product.id
            );
        }

        changePidInputValue(response.container, response.data.product.id);
    });
};

base.updateAvailability = function () {
    $("body").on("product:updateAvailability", function (e, response) {
        $("div.availability", response.$productContainer)
            .data("ready-to-order", response.product.readyToOrder)
            .data("available", response.product.available);

        $(".availability-msg", response.$productContainer)
            .empty()
            .html(response.message);

        productAvailabilityActionsTrigger(
            response.product,
            response.$productContainer
        );

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
