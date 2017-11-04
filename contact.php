<?php
if(isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['name']) && isset($_POST['msg']) && $_POST['email'] != "" && $_POST['name'] != "" && strlen($_POST['name']) > 2 && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
	$email = htmlentities($_POST['email'], ENT_QUOTES);
	$phone = htmlentities($_POST['phone'], ENT_QUOTES);
	$name = htmlentities($_POST['name'], ENT_QUOTES);
	$msg = htmlentities($_POST['msg'], ENT_QUOTES);
	
	// email
	$to = "pioneerenglishlessons@gmail.com";
	$subject = "Pioneer English Website - Contact Form Message!";
	$message = "
Name: ".$name."
Email Address: ".$email."
Phone Number: ".$phone."

Message:
".$msg."

";
	$header = "From:noreply@pioneerenglish.org \r\n";
	$sendmail = mail($to,$subject,$message,$header);
	if($sendmail == true){
		header("HTTP/1.1 200 OK");
	}
	else{
		header("HTTP/1.1 500 Internal Server Error");
	}	
}
else{
	header("HTTP/1.1 400 Bad Request");
}
?>