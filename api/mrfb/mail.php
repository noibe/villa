<?php

require 'PHPMailer/PHPMailerAutoload.php';

header("Access-Control-Allow-Origin: *");

$host = "localhost";
$username = "empreen1_mrfb";
$password = "ASASASORPP**";
$db = "empreen1_mrfb";

// Email work here!
$mail = new PHPMailer;

$mail->SMTPDebug = 3;                                 // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'box729.bluehost.com';                  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mrrango@noibe.com';                // SMTP username
$mail->Password = 'dfFMe82il0cc';                     // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to

$mail->From = 'mrrango@noibe.com';
$mail->FromName = 'Mr Feedback';
$mail->addAddress('joseeduardobarros@gmail.com', 'Eduardo');     // Add a recipient
$mail->addAddress('joseeduardo_barros@hotmail.com');               // Name is optional

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'You got a new response!';
$mail->Body    = 'This is the response body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

/* 100 out = internal server error */
$reply = "100";

echo $reply;

?>