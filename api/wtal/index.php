<?php

require '../PHPMailer/PHPMailerAutoload.php';

header("Access-Control-Allow-Origin: *");

$name = $_GET['name'];
$phone = $_GET['phone'];
$product = $_GET['product'];
$reference = $_GET['reference'];
$mail = $_GET['mail'];

$reply = '101';

$emailService = true;

// Email work here!
if ($emailService) {

	$mail = new PHPMailer;

	$mail->CharSet = 'UTF-8';

	    			$mail->SMTPDebug = 3;                                 // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'box729.bluehost.com';                  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'mailman@letsmowe.com';             // SMTP username
	$mail->Password = '64op3gZxONGO';                     // SMTP password
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;                                    // TCP port to connect to

	// From
	$mail->From = 'mrrango@noibe.com';
	$mail->FromName = 'Mowe Mailman';

	// To
	$mail->addAddress('joseeduardobarros@gmail.com', 'Eduardo');     // Send to Developer (test)
//					$mail->addAddress('joseeduardo_barros@hotmail.com');             // Send to Developer (test)

	// Additional To
	$mail->addAddress($mail);          // Send to Someone

	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'Pedido de contato - Webtal Telecom';
	$mail->Body = 'Foi realizado um pedido de contato pelo site!.<br/>';
	$mail->Body .= 'Nome: <b>' . $name . '</b><br/>';
	$mail->Body .= 'Telefone: <b>' . $phone . '</b><br/>';
	$mail->Body .= 'Produto de interesse: <b>' . $product . '</b><br/>';
	$mail->Body .= 'Tipo: <b>' . $reference . '</b><br/>';
	$mail->AltBody = 'Nome: ' . $name . 'Telefone: ' . $phone . 'Produto ' . $product . '(' . ucwords(strtolower($reference)) . ')';

	if (!$mail->send()) {
	    				echo 'Message could not be sent.';
    			echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
  					echo 'Message has been sent';
		/* 301 out = success insert */
		$reply = "301";
	}
}

echo $reply;

?>