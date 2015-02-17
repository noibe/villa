<?php
echo $_GET['local'];

header("Access-Control-Allow-Origin: *");

$host = "localhost";
$username = "empreen1_mrfb";
$password = "ASASASORPP**";
$db = "empreen1_mrfb";

// Response Array Proccess
$response;

try {
	// get response by POST method
	$response = json_decode($_POST['response']);
// Response Array Proccess
	$response;

	try {
		// get response by POST method
		$response = json_decode($_POST['response']);
	} catch (Exception $e) {
		echo $e->getMessage();
	}

	/* 100 out = internal server error */
	$reply = "100";

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

		}

		// Finish connection
		$conn->close();

	} else {
		/* 404 out = code error */
		$reply = "404";
	}
} catch (Exception $e) {
	echo $e->getMessage();
}

/* 100 out = internal server error */
$reply = "100";

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

	}

	// Finish connection
	$conn->close();

} else {
	/* 404 out = code error */
	$reply = "404";
}

echo $reply;

?>