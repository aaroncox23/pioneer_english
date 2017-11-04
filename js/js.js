$(document).ready(function() {
	
	redrawDotNav();
	
	/* Scroll event handler */
    $(window).bind('scroll',function(e){
    	parallaxScroll();
		redrawDotNav();
    });
    
	/* Next/prev and primary nav btn click handlers */
	$('a.home').click(function(){
    	$('html, body').animate({
    		scrollTop:0
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
	});
    $('a.courses').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#courses').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    $('a.testimonies').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#testimonies').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
	$('a.contact').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#contact').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    
    /* Show/hide dot lav labels on hover */
    $('nav#primary a').hover(
    	function () {
			$(this).prev('h1').show();
		},
		function () {
			$(this).prev('h1').hide();
		}
    );
    
	$("#submit_contact").click(function(){
		send_email();
	});
	
	$(document).delegate("#name_symbol", "mouseenter", function() {
		$("#name_error_div").fadeIn(400, function(){
			$("#name_error_div").css("display","inline-block");
		});
	});
	
	$(document).delegate("#name_symbol", "mouseleave", function() {
		$("#name_error_div").fadeOut(400, function(){
			$("#name_error_div").css("display","none");
		});
	});
	
	$(document).delegate("#email_symbol", "mouseenter", function() {
		$("#email_error_div").fadeIn(400, function(){
			$("#email_error_div").css("display","inline-block");
		});
	});
	
	$(document).delegate("#email_symbol", "mouseleave", function() {
		$("#email_error_div").fadeOut(400, function(){
			$("#email_error_div").css("display","none");
		});
	});
	
	$(document).delegate("#phone_symbol", "mouseenter", function() {
		$("#phone_error_div").fadeIn(400, function(){
			$("#phone_error_div").css("display","inline-block");
		});
	});
	
	$(document).delegate("#phone_symbol", "mouseleave", function() {
		$("#phone_error_div").fadeOut(400, function(){
			$("#phone_error_div").css("display","none");
		});
	});
	
	$(document).delegate("#msg_symbol", "mouseenter", function() {
		$("#msg_error_div").fadeIn(400, function(){
			$("#msg_error_div").css("display","inline-block");
		});
	});
	
	$(document).delegate("#msg_symbol", "mouseleave", function() {
		$("#msg_error_div").fadeOut(400, function(){
			$("#msg_error_div").css("display","none");
		});
	});
});

/* Scroll the background layers */
function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#parallax-bg1').css('top',(0-(scrolled*.25))+'px');
	$('#parallax-bg2').css('top',(0-(scrolled*.5))+'px');
	$('#parallax-bg3').css('top',(0-(scrolled*.75))+'px');
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#courses').offset().top - (($('#testimonies').offset().top - $('#courses').offset().top) / 2);
	var section3Top =  $('#testimonies').offset().top - (($('#contact').offset().top - $('#testimonies').offset().top) / 2);
	var section4Top =  $('#contact').offset().top - (($(document).height() - $('#contact').offset().top) / 2);;
	$('nav#primary a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.home').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.courses').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.testimonies').addClass('active');
	} else if ($(document).scrollTop() >= section4Top){
		$('nav#primary a.contact').addClass('active');
	}
	
}

function open_navigation(){
	if($("#mobile").is(':hidden')){
		$("#mobile").fadeIn(400, function(){
			$("#mobile").css("display","inline-block");
		});
	}
	else{
		$("#mobile").fadeOut(400, function(){
			$("#mobile").css("display","none");
		});
	}
}

function scroll_to_top(){
	$("html, body").animate({ scrollTop: "0" }, 1200);
}

jQuery.fn.center = function (offset){
	if(typeof offset != 'undefined' && offset != ""){
		var final_offset = offset;
	}
	else{
		var final_offset = 0;
	}
    this.css("position","fixed");
    this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2) + final_offset);
    this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
    return this;
}

function send_email(){
	event.preventDefault();
	var valid = true;
	var name_errors = "<ul>";
	var email_errors = "<ul>";
	var phone_errors = "<ul>";
	var msg_errors = "<ul>";
	
	// Contact Name //
	var isname = /^\d+$/.test($("#contact_name").val());
	if($("#contact_name").val() == ""){
		name_errors += "<li>Required Field</li>";
		valid = false;
		$("#contact_name").css("background","#FFFCA8");
	}
	else if(isname == true){
		name_errors += "<li>Name cannot solely contain numbers</li>";
		valid = false;
		$("#contact_name").css("background","#FFFCA8");
	}
	else if($("#contact_name").val().length < 5){
		name_errors += "<li>Please enter your full name</li>";
		valid = false;
		$("#contact_name").css("background","#FFFCA8");
	}
	else if($("#contact_name").val().length > 255){
		name_errors += "<li>Cannot be greater than 255 characters long</li>";
		valid = false;
		$("#contact_name").css("background","#FFFCA8");
	}
	else{
		var name = encodeURIComponent($("#contact_name").val()).replace(/[!'()*]/g, escape);
		$("#contact_name").css("background","#FFFFFF");
		name_errors = "";
	}
	
	// Contact Email //
	var email = $("#contact_email").val();
	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
		valid = false;
		$("#contact_email").css("background","#FFFCA8");
		email_errors += "<li>Not a valid e-mail address</li>";
	}
	else if($("#contact_email").val().length > 255){
		$("#contact_email").css("background","#FFFCA8");
		valid = false;
		email_errors += "<li>Cannot be greater than 255 characters long</li>";
	}
	else{
		var final_email = encodeURIComponent($("#contact_email").val()).replace(/[!'()*]/g, escape);
		$("#contact_email").css("background","#FFFFFF");
		email_errors = "";
	}
	
	// Contact Phone //
	var isphone = /^\d+$/.test($("#contact_phone").val().replace(/ /g,''));
	if($("#contact_phone").val() == ""){
		valid = false;
		$("#contact_phone").css("background","#FFFCA8");
		phone_errors += "<li>Required field</li>";
	}
	else if(isphone == false){
		valid = false;
		$("#contact_phone").css("background","#FFFCA8");
		phone_errors += "<li>Numbers only</li>";
	}
	else if($("#contact_phone").val().length > 25){
		valid = false;
		$("#contact_phone").css("background","#FFFCA8");
		phone_errors += "<li>Cannot be greater than 25 characters</li>";
	}
	else{
		var phone = $("#contact_phone").val().replace(/ /g,'');
		phone = encodeURIComponent(phone).replace(/[!'()*]/g, escape);
		$("#contact_phone").css("background","#FFFFFF");
		phone_errors = "";
	}
	
	// Contact Message //
	var isname = /^\d+$/.test($("#contact_msg").val());
	if($("#contact_msg").val() == ""){
		msg_errors += "<li>Required Field</li>";
		valid = false;
		$("#contact_msg").css("background","#FFFCA8");
	}
	else if(isname == true){
		msg_errors += "<li>Message cannot solely contain numbers</li>";
		valid = false;
		$("#contact_msg").css("background","#FFFCA8");
	}
	else if($("#contact_msg").val().length < 5){
		msg_errors += "<li>Message must be at least 5 characters in length</li>";
		valid = false;
		$("#contact_msg").css("background","#FFFCA8");
	}
	else if($("#contact_msg").val().length > 255){
		msg_errors += "<li>Cannot be greater than 255 characters long</li>";
		valid = false;
		$("#contact_msg").css("background","#FFFCA8");
	}
	else{
		var msg = encodeURIComponent($("#contact_msg").val()).replace(/[!'()*]/g, escape);
		$("#contact_msg").css("background","#FFFFFF");
		msg_errors = "";
	}
	
	// Fire it off //
	if(valid == true){
		var request = new Ajax().sendRequest
			('contact.php',
				{ method: 'POST',
				  parameters: 'name=' + name + '&email=' + final_email + '&phone=' + phone + '&msg=' + msg,
				  callback: sendemailrecieved }
			);
	}
	else{
		if(name_errors.length > 1){
			name_errors = name_errors+"</ul>";
			$("#name_error_div").html(name_errors);
			$("#name_symbol").fadeIn(400, function(){
				$("#name_symbol").css("display","inline-block");
			});
		}
		else{
			if($("#name_symbol").is(":visible")){
				$("#name_symbol").fadeOut(400, function(){
					$("#name_symbol").css("display","none");
				});
				$("#contact_name").css("background","#FFFFFF");
			}
		}
		
		if(email_errors.length > 1){
			email_errors = email_errors+"</ul>";
			$("#email_error_div").html(email_errors);
			$("#email_symbol").fadeIn(400, function(){
				$("#email_symbol").css("display","inline-block");
			});
		}
		else{
			if($("#email_symbol").is(":visible")){
				$("#email_symbol").fadeOut(400, function(){
					$("#email_symbol").css("display","none");
				});
				$("#contact_email").css("background","#FFFFFF");
			}
		}
		
		if(phone_errors.length > 1){
			phone_errors = phone_errors+"</ul>";
			$("#phone_error_div").html(phone_errors);
			$("#phone_symbol").fadeIn(400, function(){
				$("#phone_symbol").css("display","inline-block");
			});
		}
		else{
			if($("#phone_symbol").is(":visible")){
				$("#phone_symbol").fadeOut(400, function(){
					$("#phone_symbol").css("display","none");
				});
				$("#contact_phone").css("background","#FFFFFF");
			}
		}
		
		if(msg_errors.length > 1){
			msg_errors = msg_errors+"</ul>";
			$("#msg_error_div").html(msg_errors);
			$("#msg_symbol").fadeIn(400, function(){
				$("#msg_symbol").css("display","inline-block");
			});
		}
		else{
			if($("#msg_symbol").is(":visible")){
				$("#msg_symbol").fadeOut(400, function(){
					$("#msg_symbol").css("display","none");
				});
				$("#contact_msg").css("background","#FFFFFF");
			}
		}
	}
}

function sendemailrecieved(xmlHTTP){
	if(xmlHTTP.status==200){
		$('#contact_form').trigger("reset");
	}
	else if(xmlHTTP.status==400){
		alert("Invalid. Please refresh the page and try again.");
	}
	else if(xmlHTTP.status==500){
		alert("Internal Server Error, please refresh the page and try again. If the problem persists please contact the system administrator.");
	}
	else{
		alert("An error has occured, please refresh and try again. If the problem persists please contact the system administrator.");
	}
}

