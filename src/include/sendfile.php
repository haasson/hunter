<?php
$to = "b2b@exasystems.ru, anatoly.efanenkov@yandex.ru, 9993974@mail.ru, vinovet.g08@gmail.com";


$subject = 'Заполнена форма с сайта EXASystems';
$from_title = 'Заполнена форма с EXASystems';
$from_mail = 'info@exasystems.ru';
$message ='
        <html>
			<head>
				<title>'.$subject.'</title>
            </head>
			<body>
				<p>Форма: '.$_POST['nameForm'].'</p>
				<p>Имя: '.$_POST['name_f'].'</p>
                <p>Телефон: '.$_POST['phone_f'].'</p>
                <p>Сообщение: '.$_POST['message_f'].'</p>';
                
$message .='</body></html>';
$boundary = md5(date('r', time()));
$filesize = '';
$headers = "MIME-Version: 1.0\r\n";
$headers = "From: ".$from_title." <".$from_mail.">\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers .= "Content-Type: multipart/form-data; boundary=\"$boundary\"\r\n";
$message="Content-Type: multipart/form-data; boundary=\"$boundary\"

--$boundary
Content-Type: text/html; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit

$message";
for($i=0;$i<count($_FILES['file']['name']);$i++) {
    if(is_uploaded_file($_FILES['file']['tmp_name'][$i])) {
        $attachment = chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'][$i])));
        $filename = $_FILES['file']['name'][$i];
        $filetype = $_FILES['file']['type'][$i];
        $filesize += $_FILES['file']['size'][$i];
        $message.="

--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"

$attachment";
    }
}
$message.="
--$boundary--";

if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
    mail($to, $subject, $message, $headers);
    echo 'Ваше сообщение получено, спасибо!';
} else {
    echo 'Извините, письмо не отправлено. Размер всех файлов превышает 10 МБ.';
}
?>

