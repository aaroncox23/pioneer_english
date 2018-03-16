<?php
if (isset($_POST['email']) && isset($_POST['name']) && isset($_POST['message']) && $_POST['email'] != "" && $_POST['name'] != "" && $_POST['message'] != "" && is_string($_POST['name']) == true && is_string($_POST['message']) == true && is_string($_POST['email']) == true && strlen($_POST['name']) > 3 && strlen($_POST['name']) <= 255 && strlen($_POST['message']) > 3 && strlen($_POST['message']) <= 500 && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $email = stripslashes(htmlentities($_POST['email'], ENT_QUOTES));
    $name = stripslashes(htmlentities($_POST['name'], ENT_QUOTES));
    $message = stripslashes(htmlentities($_POST['message'], ENT_QUOTES));

    // email
    $to = "pioneerenglishlessons@gmail.com";
//    $to = "aaron_m_cox@hotmail.co.uk";
    $subject = "Pioneer English Website - Contact Form Message";
    $message = "
Name: " . $name . ",
Email Address: " . $email . ",

Message:
" . $message . "

";
    $header = "From:noreply@pioneerenglish.org \r\n";
    $send_mail = mail($to, $subject, $message, $header);
    if ($send_mail == true) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(400);
}