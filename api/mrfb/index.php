<?php

require 'PHPMailer/PHPMailerAutoload.php';

header("Access-Control-Allow-Origin: *");

$host = "localhost";
$username = "empreen1_mrfb";
$password = "ASASASORPP**";
$db = "empreen1_mrfb";

// Response Array Proccess
$response;

try {
	// Get response by POST method
	if (isset($_POST['response'])) {
		$response = json_decode($_POST['response']);
	}

	/* 100 out = internal server error */
	$reply = "100";

	if (isset($response)) {
		if (count($response) > 0) {

			// Create connection
			$conn = new mysqli($host, $username, $password, $db);

			// Check connection
			if ($conn->connect_error) {
				/* 304 out = connection error */
				$reply = "304";
				/*die("Connection failed: " . $conn->connect_error);*/
			}

			// Loop to each response
			for ($i = 0; $i < count($response); $i++) {

				// Create Variables
				$place = $response[$i]->place;
				$vote = $response[$i]->vote;
				$service = $response[$i]->service;
				$comment = $response[$i]->comment;

				// Register the responses to Server (MySQL)
				$sql = "INSERT INTO empreen1_mrfb.sense_log (place, vote, service, comment)
                    VALUE ('" . $place . "', $vote, $service, '" . count($response) . "')";

				if ($conn->query($sql) === TRUE) {
					/* 301 out = success insert */
					$reply = "301";
				} else {
					/* 300 out = sql error */
					$reply = "300";
					/*echo "Error: " . $sql . "<br>" . $conn->error;*/
				}

				// Send the emails here
				if ($vote < 3) {
					$emailService = true;
				} else {
					$emailService = false;
				}

				// Vote string factory
				switch($vote) {
					case 1:
						$voteString = 'Péssimo';
						break;
					case 2:
						$voteString = 'Ruim';
						break;
					case 3:
						$voteString = 'Bom';
						break;
					case 4:
						$voteString = 'Excelente';
						break;
				}

				// Email work here!
				if (@$emailService) {

					$mail = new PHPMailer;

					$mail->CharSet = 'UTF-8';

//	    			$mail->SMTPDebug = 3;                                 // Enable verbose debug output

					$mail->isSMTP();                                      // Set mailer to use SMTP
					$mail->Host = 'box729.bluehost.com';                  // Specify main and backup SMTP servers
					$mail->SMTPAuth = true;                               // Enable SMTP authentication
					$mail->Username = 'mrrango@noibe.com';                // SMTP username
					$mail->Password = 'dfFMe82il0cc';                     // SMTP password
					$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
					$mail->Port = 465;                                    // TCP port to connect to

					// From
					$mail->From = 'mrrango@noibe.com';
					$mail->FromName = 'Mr Feedback';

					// To
					$mail->addAddress('joseeduardobarros@gmail.com', 'Eduardo');     // Send to Developer (test)
//					$mail->addAddress('joseeduardo_barros@hotmail.com');             // Send to Developer (test)

					// Additional To
					$mail->addAddress('garrido_lt@hotmail.com');                     // Send to Lourenço
					$mail->addAddress('rh.rafaelsouza@outlook.com');                 // Send to Rafael
					$mail->addAddress('talita.rodrigues24@hotmail.com');             // Send to Talita

					$mail->isHTML(true);                                  // Set email format to HTML

					$mail->Subject = 'Nova avaliação no ' . ucwords(strtolower($place)) . '!';
					$mail->Body = 'Você teve uma avaliação negativa no restaurante ' . ucwords(strtolower($place)) . '.<br/>';
					$mail->Body .= 'A nota de avaliação foi: <b>' . $voteString . '</b>';
					$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

					if (!$mail->send()) {
//	    				echo 'Message could not be sent.';
//		    			echo 'Mailer Error: ' . $mail->ErrorInfo;
					} else {
//  					echo 'Message has been sent';
						/* 301 out = success insert */
						$reply = "301";
					}

				}
			}

			// Finish connection
			$conn->close();

		} else {
			/* 404 out = code error */
			$reply = "404";
		}
	}
} catch (Exception $e) {
	echo $e->getMessage();
}

echo $reply;

?>