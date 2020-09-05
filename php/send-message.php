<?php

header('Content-Type: text/html; charset=utf-8');

$errorMSG = array();

// NAME
if (empty($_POST["name"])) {
    $errorMSG["name"] = "Name is required ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG["email"] = "Email is required ";
} else {
    $email = $_POST["email"];
}

// SUBJECT
//if (empty($_POST["subject"])) {
//    $errorMSG["subject"] = "Subject is required ";
//} else {
//    $subject = $_POST["subject"];
//}


// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG["message"] = "Message is required ";
} else {
    $message = $_POST["message"];
}


$EmailTo = "emailaddress@test.com";
$Subject = "New Message Received";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= $subject;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && empty($errorMSG)){
   echo "success";
}else{
    if(empty($errorMSG)){
        echo "Something went wrong :(";
    } else {
        echo json_encode($errorMSG);
    }
}

?>