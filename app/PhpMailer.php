<?php

namespace YellowProject;

use Illuminate\Database\Eloquent\Model;
use YellowProject\SettingPhpMailer;

class PhpMailer extends Model
{
    public static function sendMail($token,$user)
    {
    	$phpMailer = SettingPhpMailer::where('is_active',1)->first();
		require 'PHPMailerAutoload.php';
    	$mail = new \PHPMailer;
		//$mail->SMTPDebug = 3;                               // Enable verbose debug output
		$mail->isSMTP();
		$mail->CharSet = 'UTF-8';
		$mail->Host = $phpMailer->mail_host;  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = $phpMailer->mail_username;                 // SMTP username
		$mail->Password = $phpMailer->mail_password;                           // SMTP password
		$mail->SMTPSecure = $phpMailer->mail_encryption;                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = $phpMailer->mail_port;                                    // TCP port to connect to

		//$mail->setFrom('shoppingsupport@scgexperience.com', 'ระบบอัตโนมัติ');  // SCG Email
		$mail->setFrom('developer@yellow-idea.com', 'Yellow Idea');
		$mail->addAddress($user->email);     // Add a recipient

		$mail->isHTML(true);                                  // Set email format to HTML

		$mail->Subject = 'Reset your password';
		$mail->Body    = view('emails.password',['token' => $token, 'user' => $user]);

		if(!$mail->send()) {
		    // echo 'Message could not be sent.';
		    // echo 'Mailer Error: ' . $mail->ErrorInfo;
		    // dd('Mailer Error: ' . $mail->ErrorInfo);
		} else {
			// dd('Message has been sent');
		    // echo 'Message has been sent';
		}
		// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    }

    public static function ecomSendEmail($text,$email,$subject)
    {
    	$phpMailer = SettingPhpMailer::where('is_active',1)->first();
	    require 'PHPMailerAutoload.php';
	    $mail = new \PHPMailer;
	    //$mail->SMTPDebug = 3;                               // Enable verbose debug output
	    $mail->isSMTP();
	    $mail->CharSet = 'UTF-8';
	    $mail->Host = $phpMailer->mail_host;  // Specify main and backup SMTP servers
	    $mail->SMTPAuth = true;                               // Enable SMTP authentication
	    $mail->Username = $phpMailer->mail_username;                 // SMTP username
	    $mail->Password = $phpMailer->mail_password;                           // SMTP password
	    $mail->SMTPSecure = $phpMailer->mail_encryption;                            // Enable TLS encryption, `ssl` also accepted
	    $mail->Port = $phpMailer->mail_port;                                    // TCP port to connect to

	    $mail->setFrom('shoppingsupport@scgexperience.com', 'SCG SHOPPING LINE');
	    //$mail->setFrom('shoppingsupport@scgexperience.com', 'SCG SHOPPING LINE'); // SCG Email
        //$mail->setFrom('developer@yellow-idea.com', 'Yellow Idea');
	    $mail->addAddress($email);     // Add a recipient

	    $mail->isHTML(true);                                  // Set email format to HTML

	    $mail->Subject = $subject;
	    $mail->Body    = $text;

	    if(!$mail->send()) {
	    	\Log::debug('Mailer Error: ' . $mail->ErrorInfo);
	        // echo 'Message could not be sent.';
	        // echo 'Mailer Error: ' . $mail->ErrorInfo;
	        // dd('Mailer Error: ' . $mail->ErrorInfo);
	    } else {
	      	// dd('Message has been sent');
	        // echo 'Message has been sent';
	    }

	    return 1 ;
	    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    }
}
