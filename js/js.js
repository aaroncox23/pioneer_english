jQuery.fn.center = function (offset) {
    var final_offset = 0;
    if (typeof offset != 'undefined' && offset != "") {
        final_offset = offset;
    }
    this.css("position", "fixed");
    this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2) + final_offset);
    this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
    return this;
}

$(document).ready(function () {
    var triangle_width = ($(window).width() / 100) * 75;
    var triangle_height = $(window).width() / 4.85;
    $(".arrow-up").css("border-left", triangle_width + "px solid transparent");
    $(".arrow-up").css("border-right", triangle_width + "px solid transparent");
    $(".arrow-up").css("border-top", triangle_height + "px solid black");

    $(window).on('resize', function () {
        var triangle_width = ($(window).width() / 100) * 75;
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

    // Email //
    $('#submit_wrapper').click(function () {
        validate_email();
    });
});

function validate_email() {
    var name = $("#name");
    var name_errors = $("#name_errors");
    var email = $("#email");
    var email_errors = $("#email_errors");
    var message = $("#message");
    var message_errors = $("#message_errors");
    var valid = true;

    if (name.val() == "") {
        valid = false;
        name_errors.html("<p>*Required Field</p>");
    } else if (name.val().length < 4) {
        valid = false;
        name_errors.html("<p>*Must be at least 4 characters</p>");
    } else if (name.val().length > 255) {
        valid = false;
        name_errors.html("<p>*Cannot be greater than 255 characters</p>");
    }
    else {
        if (name_errors.is(":visible")) {
            name_errors.fadeOut(400, function () {
                name_errors.css("display", "none");
                name_errors.html("");
            })
        }
        var name_input = encodeURIComponent(name.val()).replace(/[!'()*]/g, escape);
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.val())) {
        if (email_errors.is(":visible")) {
            email_errors.fadeOut(400, function () {
                email_errors.css("display", "none");
                email_errors.html("");
            })
        }
        var email_input = encodeURIComponent(email.val()).replace(/[!'()*]/g, escape);
    } else {
        valid = false;
        email_errors.html("<p>*Not a valid email address</p>");
    }

    if (message.val() == "") {
        valid = false;
        message_errors.html("<p>*Required Field</p>");
    } else if (message.val().length < 4) {
        valid = false;
        message_errors.html("<p>*Must be at least 4 characters</p>");
    } else if (message.val().length > 500) {
        valid = false;
        message_errors.html("<p>*Cannot be greater than 255 characters</p>");
    }
    else {
        if (message_errors.is(":visible")) {
            message_errors.fadeOut(400, function () {
                message_errors.css("display", "none");
                message_errors.html("");
            })
        }
        var message_input = encodeURIComponent(message.val()).replace(/[!'()*]/g, escape);
    }

    if (valid == true) {
        // Send //
        var request = new Ajax().sendRequest
        ('contact.php',
            {
                method: 'POST',
                parameters: 'name=' + name_input + '&email=' + email_input + '&message=' + message_input,
                callback: sendemailrecieved
            }
        );

    } else {
        // Show Errors //
        if (name_errors.html() != "") {
            name_errors.fadeIn(400, function () {
                name_errors.css("display", "block");
            })
        }
        if (email_errors.html() != "") {
            email_errors.fadeIn(400, function () {
                email_errors.css("display", "block");
            })
        }
        if (message_errors.html() != "") {
            message_errors.fadeIn(400, function () {
                message_errors.css("display", "block");
            })
        }
    }
}

function sendemailrecieved(xmlHTTP) {
    var message = "";
    if (xmlHTTP.status == 200) {
        message = "<div id='success_msg'><p>Message Successfully Sent</p></div>";
    } else if (xmlHTTP.status == 400 || xmlHTTP.status == 500 || xmlHTTP.status == 404) {
        message = "<div id='failed_msg'><p>Something went wrong, please refresh and try again.<br />If the problem persists please contact the system admin at<br />workingdesign@hotmail.co.uk</p></div>";
    }
    message += "<a id='exit_btn' onclick='close_msg()'><img src='img/x_24.png' width='24' height='24' alt='Exit Message' title='Exit Message' /> </a>";
    $("body").css("overflow-y", "hidden");
    $("#page_cover").fadeIn(400);
    $("#msg_response").html(message).center().fadeIn(400, function(){
        $("#page_cover").css("display", "block");
        $("#msg_response").css("display", "block");
    });

}

function close_msg(){
    $("body").css("overflow-y", "scroll");
    $("#page_cover").fadeOut(400);
    $("#msg_response").fadeOut(400, function(){
        $("#page_cover").css("display", "none");
        $("#msg_response").css("display", "none").html("");
    });
}