$(document).ready(function () {
    var triangle_width = ($(window).width() / 100)*75;
    var triangle_height = $(window).width() / 4.85;
    $(".arrow-up").css("border-left", triangle_width + "px solid transparent");
    $(".arrow-up").css("border-right", triangle_width + "px solid transparent");
    $(".arrow-up").css("border-top", triangle_height + "px solid black");

    $(window).on('resize', function () {
        var triangle_width = ($(window).width() / 100)*75;
        var triangle_height = $(window).width() / 4.85;
        $(".arrow-up").css("border-left", triangle_width + "px solid transparent");
        $(".arrow-up").css("border-right", triangle_width + "px solid transparent");
        $(".arrow-up").css("border-top", triangle_height + "px solid black");
    });

    // Select all links with hashes
    $('.navbar a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                        ;
                    });
                }
            }
        });

    $('.find_out_div a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                        ;
                    });
                }
            }
        });
});

$('button').click(function() {
    $(this).toggleClass('clicked');
    $('button p').text(function(i, text) {
        return text === "Sent!" ? "Send" : "Sent!";
    });
});