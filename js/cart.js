/* ==========================================================================
   Gayathri Bakshanam - Interactive Cart & Quantity Stepper Manager
   ========================================================================== */

(function($) {
    "use strict";

    var DEFAULT_CART = [
        {
            id: "south-indian-mixture",
            title: "Special South Indian Mixture",
            price: 135.00,
            originalPrice: 270.00,
            weight: "500g",
            image: "img/item/1.jpg",
            qty: 1
        },
        {
            id: "sweet-seedai",
            title: "Traditional Sweet Seedai",
            price: 250.00,
            originalPrice: 500.00,
            weight: "250g",
            image: "img/item/2.jpg",
            qty: 1
        },
        {
            id: "kara-thattai",
            title: "Crunchy Kara Thattai",
            price: 210.00,
            originalPrice: 420.00,
            weight: "500g",
            image: "img/item/3.jpg",
            qty: 1
        },
        {
            id: "filter-coffee",
            title: "Madras Special Filter Coffee Powder",
            price: 185.00,
            originalPrice: 370.00,
            weight: "250g",
            image: "img/item/4.jpg",
            qty: 1
        },
        {
            id: "sambar-podi",
            title: "Homemade Sambar Podi",
            price: 120.00,
            originalPrice: 240.00,
            weight: "250g",
            image: "img/item/5.jpg",
            qty: 1
        }
    ];

    // Helper: Get cart from localStorage or set default
    function getCart() {
        try {
            var stored = localStorage.getItem('gb_cart');
            if (stored) {
                var parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) return parsed;
            }
        } catch(e) {
            console.error("Cart storage error:", e);
        }
        localStorage.setItem('gb_cart', JSON.stringify(DEFAULT_CART));
        return DEFAULT_CART;
    }

    // Helper: Save cart to localStorage
    function saveCart(cart) {
        try {
            localStorage.setItem('gb_cart', JSON.stringify(cart));
        } catch(e) {
            console.error("Cart save error:", e);
        }
        renderCartUI();
    }

    // Main UI Render Function
    function renderCartUI() {
        var cart = getCart();
        var totalQty = 0;
        var subTotal = 0;

        cart.forEach(function(item) {
            totalQty += parseInt(item.qty || 1, 10);
            subTotal += (parseFloat(item.price || 0) * parseInt(item.qty || 1, 10));
        });

        // 1. Update Cart Badge Counters in Navbar across all pages
        $('.cart-nav .badge, .navbar-nav .badge-danger').text(totalQty);

        // 2. Update Cart Sidebar Header
        $('.cart-sidebar-header h5 .text-info').text('(' + totalQty + ' item' + (totalQty === 1 ? '' : 's') + ')');

        // 3. Render Cart Sidebar Body
        var $body = $('.cart-sidebar-body');
        if ($body.length > 0) {
            if (cart.length === 0) {
                $body.html('<div class="text-center py-5 text-muted"><i class="icofont-basket icofont-4x mb-3 text-secondary d-block"></i><p class="font-weight-bold">Your cart is empty!</p><p class="small">Add delicious sweets & savouries to get started.</p></div>');
            } else {
                var html = '';
                cart.forEach(function(item, index) {
                    var origPrice = item.originalPrice ? '<del class="small text-muted font-weight-normal">₹' + parseFloat(item.originalPrice).toFixed(2) + '</del>' : '';
                    html += '<div class="cart-list-product" data-cart-index="' + index + '">' +
                        '<a class="float-right remove-cart gb-remove-item" href="#" data-index="' + index + '"><i class="icofont icofont-close-circled"></i></a>' +
                        '<img class="img-fluid" src="' + (item.image || 'img/item/1.jpg') + '" alt="' + (item.title || 'Product') + '">' +
                        '<span class="badge badge-success">' + (item.weight || 'Standard') + '</span>' +
                        '<h5><a href="product-detail.html">' + item.title + '</a></h5>' +
                        '<p class="f-14 mb-0 text-dark font-weight-bold float-right">₹' + parseFloat(item.price).toFixed(2) + ' ' + origPrice + '</p>' +
                        '<span class="count-number float-left">' +
                            '<button class="btn btn-outline-secondary btn-sm left dec gb-qty-dec" data-index="' + index + '"> <i class="icofont-minus"></i> </button>' +
                            '<input class="count-number-input" type="text" value="' + item.qty + '" readonly="">' +
                            '<button class="btn btn-outline-secondary btn-sm right inc gb-qty-inc" data-index="' + index + '"> <i class="icofont-plus"></i> </button>' +
                        '</span>' +
                    '</div>';
                });
                $body.html(html);
            }
        }

        // 4. Update Cart Sidebar Footer Checkout Button Total
        $('.cart-sidebar-footer a strong, .cart-sidebar-footer button strong').text('₹' + subTotal.toFixed(2));

        // 5. Update Checkout Page Order Summary if on checkout.html
        renderCheckoutTable(cart, subTotal);
    }

    // Helper: Render Order Table on Checkout Page
    function renderCheckoutTable(cart, subTotal) {
        var $checkoutTable = $('.checkout-step .table-cart tbody');
        if ($checkoutTable.length > 0) {
            var html = '';
            cart.forEach(function(item, index) {
                var origPrice = item.originalPrice ? '<br><del class="small text-secondary">₹' + parseFloat(item.originalPrice).toFixed(2) + '</del>' : '';
                html += '<tr>' +
                    '<td class="cart_product"><a href="#"><img class="img-fluid" src="' + (item.image || 'img/item/1.jpg') + '" alt="' + item.title + '"></a></td>' +
                    '<td class="cart_description">' +
                        '<h6 class="product-name"><a href="#">' + item.title + '</a></h6>' +
                        '<p class="f-12 text-secondary mb-1 pt-1 pb-1">Weight: ' + (item.weight || 'Standard') + '</p>' +
                        '<hr>' +
                        '<a class="text-danger gb-remove-item" href="#" data-index="' + index + '"><i class="icofont-trash"></i> Remove Item</a>' +
                    '</td>' +
                    '<td class="qty">' +
                        '<div class="input-group quantity-input p4 p8 j2">' +
                            '<span class="input-group-btn"><button type="button" class="btn btn-outline-secondary btn-number btn-lg p3 gb-qty-dec" data-index="' + index + '"><span class="fa fa-minus p9"></span></button></span>' +
                            '<input type="text" class="text-center form-control border-form-control form-control-sm input-number p2 p10" value="' + item.qty + '" readonly="">' +
                            '<span class="input-group-btn"><button type="button" class="btn btn-outline-secondary btn-number btn-lg p3 gb-qty-inc" data-index="' + index + '"><span class="fa fa-plus p9"></span></button></span>' +
                        '</div>' +
                    '</td>' +
                    '<td class="price">' +
                        '<p class="f-14 mb-0 text-dark">₹' + (parseFloat(item.price) * parseInt(item.qty)).toFixed(2) + origPrice + '</p>' +
                    '</td>' +
                '</tr>';
            });
            $checkoutTable.html(html);

            // Update footer subtotals in checkout
            $('.checkout-step .table-cart tfoot tr:last-child td strong').text('₹' + subTotal.toFixed(2));
        }
    }

    // Add Item to Cart Function
    window.gbAddToCart = function(itemData) {
        var cart = getCart();
        var found = false;

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].title === itemData.title && cart[i].weight === itemData.weight) {
                cart[i].qty = parseInt(cart[i].qty || 1, 10) + parseInt(itemData.qty || 1, 10);
                found = true;
                break;
            }
        }

        if (!found) {
            cart.push({
                id: itemData.id || itemData.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                title: itemData.title,
                price: parseFloat(itemData.price) || 150.00,
                originalPrice: parseFloat(itemData.originalPrice) || 220.00,
                weight: itemData.weight || "250g",
                image: itemData.image || "img/item/1.jpg",
                qty: parseInt(itemData.qty || 1, 10)
            });
        }

        saveCart(cart);

        // Open offcanvas drawer
        $('body').addClass('toggled');
    };

    // Event Handlers Setup
    $(document).ready(function() {
        // Initial render
        renderCartUI();

        // 1. Quantity Increment in Cart Sidebar & Checkout
        $(document).on('click', '.gb-qty-inc', function(e) {
            e.preventDefault();
            var index = $(this).data('index');
            var cart = getCart();
            if (cart[index]) {
                cart[index].qty = parseInt(cart[index].qty || 1, 10) + 1;
                saveCart(cart);
            }
        });

        // 2. Quantity Decrement in Cart Sidebar & Checkout
        $(document).on('click', '.gb-qty-dec', function(e) {
            e.preventDefault();
            var index = $(this).data('index');
            var cart = getCart();
            if (cart[index]) {
                if (cart[index].qty > 1) {
                    cart[index].qty = parseInt(cart[index].qty, 10) - 1;
                } else {
                    cart.splice(index, 1);
                }
                saveCart(cart);
            }
        });

        // 3. Remove Item from Cart
        $(document).on('click', '.gb-remove-item', function(e) {
            e.preventDefault();
            var index = $(this).data('index');
            var cart = getCart();
            if (cart[index] !== undefined) {
                cart.splice(index, 1);
                saveCart(cart);
            }
        });

        // 4. Product Card Quantity Stepper on Home / Product Grid / Detail Page (Non-Cart)
        $(document).on('click', '.quantity-input .btn-number, .quantity-input .dec, .quantity-input .inc', function(e) {
            if ($(this).hasClass('gb-qty-inc') || $(this).hasClass('gb-qty-dec')) return; // Handled separately
            e.preventDefault();
            var $input = $(this).closest('.quantity-input').find('input');
            var currentVal = parseInt($input.val(), 10) || 1;
            var type = $(this).data('type') || ($(this).hasClass('inc') ? 'plus' : 'minus');

            if (type === 'plus' || $(this).hasClass('inc')) {
                $input.val(currentVal + 1);
            } else if (type === 'minus' || $(this).hasClass('dec')) {
                if (currentVal > 1) {
                    $input.val(currentVal - 1);
                }
            }
        });

        // 5. Add to Cart from Product Cards (Home, Grid, Search)
        $(document).on('click', '.list-item .btn-primary, .card .btn-primary, .card .icofont-shopping-cart', function(e) {
            var $card = $(this).closest('.card, .list-item');
            if ($card.length > 0) {
                var title = $card.find('.card-title, h6, h5').first().text().trim();
                var image = $card.find('img.card-img-top, img').attr('src');
                var priceText = $card.find('.p16, .price-box, .text-dark').text();
                var priceMatch = priceText.match(/₹\s*([\d\.]+)/);
                var price = priceMatch ? parseFloat(priceMatch[1]) : 150.00;

                if (title) {
                    e.preventDefault();
                    window.gbAddToCart({
                        title: title,
                        price: price,
                        originalPrice: price * 1.5,
                        weight: "250g",
                        image: image || "img/item/1.jpg",
                        qty: 1
                    });
                }
            }
        });

        // 6. Add to Cart from Product Detail Page
        $(document).on('click', '.product-variation button:contains("Add To Cart")', function(e) {
            e.preventDefault();
            var title = $('.shop-detail-right h4, .shop-detail-right h3').first().text().trim() || "Gayathri Bakshanam Delicacy";
            var image = $('#sync1 .item img, .shop-detail-left img').first().attr('src') || "img/item/1.jpg";
            var priceText = $('.product-price').text();
            var priceMatch = priceText.match(/₹\s*([\d\.]+)/);
            var price = priceMatch ? parseFloat(priceMatch[1]) : 180.00;
            var qty = parseInt($('.quantity-input input').val(), 10) || 1;
            var selectedWeight = $('.product-color-size-area label.active').first().text().trim() || "250g";

            window.gbAddToCart({
                title: title,
                price: price,
                originalPrice: price * 1.35,
                weight: selectedWeight,
                image: image,
                qty: qty
            });
        });
    });

})(jQuery);
