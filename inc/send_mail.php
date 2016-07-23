<?php
$name = htmlspecialchars($_POST['name']);
$phone = htmlspecialchars($_POST['phone']);
$email = htmlspecialchars($_POST['email']);
$text = htmlspecialchars($_POST['text']);
$subject = 'Сообщение с сайта';



$to = 'test <lol_t@bk.ru>';
$from = 'Task <leess0347@gmail.com>';



$headers = 'From: ' . $from . "\r\n";
$headers .= "Content-type: text/html; charset=\"utf-8\"";

$email_content = '';
if($name) $email_content .= 'Имя: ' . $name . "<br>";

if($phone) $email_content .= 'Телефон: ' . $phone . "<br>";
if($email) $email_content .= 'Email: ' . $email . "<br>";
if($text) $email_content .= 'Сообщение: ' . $text;
if($email_content == '') return false;
$result = mail( $to, '=?UTF-8?B?'.base64_encode($subject).'?=', $email_content, $headers );
?>