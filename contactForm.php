<?php


$first_name = $_POST['formFirstName'];
$last_name = $_POST['formLastName'];
$phone_number = $_POST['phoneNumber'];
$visitor_email = $_POST['email'];
$visitor_callback = $_POST['formCallBack'];
$visitor_website = $_POST['formWebsite'];
$message = $_POST['message'];


$services_formWebDesign = $_POST['formWebDesign'];
$services_formReDesign = $_POST['formReDesign'];
$services_formTroubleshooting = $_POST['formTroubleshooting'];

$services_formWPSupport = $_POST['formWPSupport'];
$services_formWebHosting = $_POST['formWebHosting'];
$services_formLogoDesign = $_POST['formLogoDesign'];
$services_formBrandDesign = $_POST['formBrandDesign'];
$services_formGraphicDesign = $_POST['formGraphicDesign'];
$services_formSEO = $_POST['formSEO'];
$services_formCybersecurity = $_POST['formCybersecurity'];
$services_formRansomware = $_POST['formRansomware'];
$services_formDigitalMarketing = $_POST['formDigitalMarketing'];
$services_formCopywrite = $_POST['formCopywrite'];
$services_formFreeConsult = $_POST['formFreeConsult'];
$services_formFreeAudit = $_POST['formFreeAudit'];



if(isset($_POST['g-recaptcha-response'])){
  $captcha=$_POST['g-recaptcha-response'];
}

if(isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}
// if(empty($first_name)||empty($visitor_email)) 
// {
//     echo "Name and email are mandatory!";
//     exit;
// }

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}
if(!$captcha){
  echo '
Please check the the captcha form.
';
  exit;
}






//Validate first


$email_from = 'info@webdesignmatrix.com';//<== update the email address
$email_subject = "New Form submission";
$email_body = "You have received a new message from the user: 
$first_name  $last_name \n \n".

"Here is the message: 
    
**** 

$message 

****
    
Budget is: $budget 
    
Services needed: \n
$services_webdesign 
$services_formReDesign 
$services_formTroubleshooting
$services_webdesign
$services_formWPSupport
$services_formWebHosting
$services_formLogoDesign
$services_formBrandDesign
$services_formGraphicDesign
$services_formSEO
$services_formCybersecurity
$services_formDigitalMarketing
$services_formSocialMedia
$services_formCopywright
$services_formFreeConsult

Visitor website is: $visitor_website 
Callback requested: $visitor_callback
Visitor phone number: $phone_number


    .".
    
$to = "info@webdesignmatrix.com";//<== update the email address
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
//Send the email!
// mail($to,$email_subject,$email_body,$headers);
$secretKey = "6Leva-UjAAAAAMInqBECsS0QGauwXDZHUDToY9MD";
$ip = $_SERVER['REMOTE_ADDR'];
// post request to server
$url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) .  '&response=' . urlencode($captcha);
$response = file_get_contents($url);
$responseKeys = json_decode($response,true);
if($responseKeys["success"]) {
mail($to,$email_subject,$email_body,$headers);
  header( "refresh:5;url=index.html" );
  echo("<p>Message successfully sent! Redirecting to https://www.WebDesignMatrix.com in 5 seconds....</p>");
  header('index.html');
}

else {echo '
Spammer detected!
';
}
//done. redirect to thank-you page.



// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}

?> 