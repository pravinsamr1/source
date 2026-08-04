/* ==========================================================================
   Gayathri Bakshanam - Custom JS
   ========================================================================== */

(function($) {
    "use strict";

    // =========== 6-Digit OTP Mobile Login Flow (Inline Expand) ===========

    // When "Send 6-Digit OTP" button is clicked
    $(document).on('click', '#btn-request-otp', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var mobileNum = $('#login-mobile-num').val().replace(/\D/g, '').trim();

        if (/^[6-9]\d{9}$/.test(mobileNum)) {
            // Valid number — hide the button and show OTP section
            $('#mobile-error-msg').addClass('d-none');
            var maskedNum = '+91 ' + mobileNum.slice(0, 5) + ' ' + mobileNum.slice(5);
            $('#display-mobile-no').text(maskedNum);
            $('#get-otp-btn-wrapper').hide().addClass('d-none');
            $('#otp-verify-step').removeClass('d-none').css('display', 'block');
            // Clear any previous OTP input
            $('.otp-digit-box').val('');
            // Focus first OTP box
            setTimeout(function() {
                $('.otp-digit-box').first().focus();
            }, 100);
        } else {
            // Invalid number — show error
            $('#mobile-error-msg')
                .removeClass('d-none')
                .text('Please enter a valid 10-digit mobile number starting with 6-9.');
        }
    });

    // If mobile number is edited, reset and show the Send OTP button again
    $(document).on('input', '#login-mobile-num', function() {
        if ($('#otp-verify-step').is(':visible') || !$('#otp-verify-step').hasClass('d-none')) {
            $('#otp-verify-step').addClass('d-none').css('display', 'none');
            $('#get-otp-btn-wrapper').removeClass('d-none').css('display', 'block');
        }
        $('#mobile-error-msg').addClass('d-none');
    });

    // Auto-advance to next box when a digit is typed
    $(document).on('input keyup', '.otp-digit-box', function(e) {
        var $this = $(this);
        var val = $this.val().replace(/[^0-9]/g, '');
        $this.val(val.slice(0, 1)); // only one digit per box

        if (val.length >= 1) {
            var $next = $this.next('.otp-digit-box');
            if ($next.length) {
                $next.focus();
            }
        }
    });

    // Backspace: go to previous box if current is empty
    $(document).on('keydown', '.otp-digit-box', function(e) {
        var $this = $(this);
        if (e.key === 'Backspace' && $this.val() === '') {
            var $prev = $this.prev('.otp-digit-box');
            if ($prev.length) {
                $prev.focus().val('');
            }
        }
    });

    // Verify & Login button click
    $(document).on('click', '#btn-confirm-otp', function(e) {
        e.preventDefault();
        var otpCode = '';
        $('.otp-digit-box').each(function() {
            otpCode += $(this).val();
        });

        if (otpCode.length === 6) {
            $('#otp-error-msg').addClass('d-none');
            $('#login').modal('hide');
            // TODO: Integrate real OTP verification API here
            alert('OTP Verified! Logged in successfully.');
        } else {
            $('#otp-error-msg')
                .removeClass('d-none')
                .text('Please enter all 6 digits of your OTP code.');
        }
    });

    // Resend OTP button
    $(document).on('click', '#btn-resend-otp', function(e) {
        e.preventDefault();
        $('.otp-digit-box').val('');
        $('.otp-digit-box').first().focus();
        // TODO: Trigger resend OTP API call here
        alert('OTP resent to your mobile number!');
    });

    // =========== Reset modal state when closed ===========
    $(document).on('hidden.bs.modal', '#login', function() {
        $('#login-mobile-num').val('');
        $('#mobile-error-msg').addClass('d-none');
        $('#otp-verify-step').addClass('d-none').css('display', 'none');
        $('#get-otp-btn-wrapper').removeClass('d-none').css('display', 'block');
        $('.otp-digit-box').val('');
        $('#otp-error-msg').addClass('d-none');
    });

})(jQuery);



/*
Template Name: Chpoee - Bootstrap E-Commerce Template
Author: Askbootstrap
Author URI: https://themeforest.net/user/askbootstrap
Version: 1.1
*/
$(document).ready(function() {
    "use strict";

    var ones = $("#owl-carousel-one");
    ones.owlCarousel({
        singleItem: true,
        items: 1,
        slideSpeed: 1000,
        pagination: false,
        navigation: true,
        autoPlay: 3500,
		dots: false,
        nav: true,
        navigationText: ["<i class='icofont icofont-thin-left'></i>", "<i class='icofont icofont-thin-right'></i>"],
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });

    // ===========Category Owl Carousel (3 per row on mobile)============
    var objowlcarousel = $(".owl-carousel-category");
    if (objowlcarousel.length > 0) {
        objowlcarousel.owlCarousel({
            items: 6,
            itemsDesktop: [1199, 5],
            itemsDesktopSmall: [979, 4],
            itemsTablet: [768, 4],
            itemsTabletSmall: [575, 3],
            itemsMobile: [479, 3],
            lazyLoad: true,
            pagination: false,
            loop: true,
            autoPlay: 2500,
            navigation: true,
            stopOnHover: true,
            navigationText: ["<i class='icofont icofont-thin-left'></i>", "<i class='icofont icofont-thin-right'></i>"]
        });
    }

    // ===========Featured / New Arrived / Festival Products Carousel============
    var featuredCarousel = $(".owl-carousel-featured");
    if (featuredCarousel.length > 0) {
        featuredCarousel.owlCarousel({
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 3],
            itemsTabletSmall: [575, 2],
            itemsMobile: [479, 2],
            lazyLoad: true,
            pagination: false,
            loop: true,
            autoPlay: 3000,
            navigation: true,
            stopOnHover: true,
            navigationText: ["<i class='icofont icofont-thin-left'></i>", "<i class='icofont icofont-thin-right'></i>"]
        });
    }

    // ===========Right Sidebar============
    $('[data-toggle="offcanvas"]').on('click', function() {
        $('body').toggleClass('toggled');
    });

    // ===========Hover Nav============ 
    $('.navbar-nav li.dropdown').on('mouseenter', function(){ $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(500); })
    $('.navbar-nav li.dropdown').on('mouseleave', function(){ $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(500); })
    
	// ===========Select2============
    $('select').select2();
	
    // ===========Tooltip============
    $('[data-toggle="tooltip"]').tooltip();

    // ===========Single Items Slider============   
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    sync1.owlCarousel({
        singleItem: true,
        items: 1,
        slideSpeed: 1000,
        pagination: false,
        navigation: true,
        autoPlay: 2500,
		dots: false,
        nav: true,
        navigationText: ["<i class='icofont icofont-thin-left'></i>", "<i class='icofont icofont-thin-right'></i>"],
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });
    sync2.owlCarousel({
        items: 5,
        navigation: true,
        dots: false,
        pagination: false,
        nav: true,
        navigationText: ["<i class='icofont icofont-thin-left'></i>", "<i class='icofont icofont-thin-right'></i>"],
        responsiveRefreshRate: 100,
        afterInit: function(el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
        }
    }
    $("#sync2").on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }
        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }
    }
	
	// ===========Datatabel============
	$('.datatabel').DataTable();

});