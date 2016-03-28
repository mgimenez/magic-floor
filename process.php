<?php
header("Access-Control-Allow-Origin: *");
//Retrieve form data. 
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_GET['name']) ? $_GET['name'] : $_POST['name'];
$email = ($_GET['email']) ?$_GET['email'] : $_POST['email'];
$res = ($_GET['res']) ?$_GET['res'] : $_POST['res'];
$telefono = ($_GET['telefono']) ?$_GET['telefono'] : $_POST['telefono'];
$comment = ($_GET['comment']) ?$_GET['comment'] : $_POST['comment'];

//flag to indicate which method it uses. If POST set it to 1
if ($_POST) $post=1;

//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Por favor ingrese su nombre.';
if (!$email) $errors[count($errors)] = 'Por favor ingrese su email.'; 
if (!$comment) $errors[count($errors)] = 'Por favor ingrese su mensaje.'; 

//if the errors array is empty, send the mail
if (!$errors) {

	//recipient
	$to = 'MAGIC-FLOOR <pisosencastrables@hotmail.com>';
	//sender
	$from = $name . ' <' . $email . '>';
	
	//subject and the html message
	$subject = 'MAGIC-FLOOR WEB - Mensaje de ' . $name;	
	$message = '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head></head>
	<body>
		<p>Este es un mensaje enviado a través del sitio web <a href="http://www.magic-floor.com.ar">www.magic-floor.com.ar</a>
	<table>
		<tr><td>Nombre: </td><td>' . $name . '</td></tr>
		<tr><td>Email: </td><td>' . $email . '</td></tr>
		<tr><td>Teléfono: </td><td>' . $telefono . '</td></tr>
		<tr><td>Empresa: </td><td>' . $res . '</td></tr>
		<tr><td>Mensaje: </td><td>' . nl2br($comment) . '</td></tr>
	</table>
	</body>
	</html>';

	//send the mail
	$result = sendmail($to, $subject, $message, $from);
	
	//if POST was used, display the message straight away
	if ($_POST) {
		if ($result) echo '¡Gracias! Hemos recibido su mensaje.';
		else echo 'Perdón, hubo un error. Por favor, vuelva a intentar';
		
	//else if GET was used, return the boolean value so that 
	//ajax script can react accordingly
	//1 means success, 0 means failed
	} else {
		echo $result;	
	}

//if the errors array has values
} else {
	//display the errors message
	for ($i=0; $i<count($errors); $i++) echo $errors[$i] . '<br/>';
	echo '<a href="index.html">Back</a>';
	exit;
}

if(isset ($_GET['callback'])) {
    header("Content-Type: application/json");
    echo $_GET['callback']."('callback')";
}

//Simple mail function with HTML header
function sendmail($to, $subject, $message, $from) {
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	$headers .= 'From: ' . $from . "\r\n";
	
	$result = mail($to,$subject,$message,$headers);
	
	if ($result) echo $_GET['callback'] . '();';
	else return 0;
}

?>