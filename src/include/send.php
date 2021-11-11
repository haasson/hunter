<?php
// Файлы phpmailer

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

require __DIR__ . '/compoundMsg.php';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    // Перебираем имена полей и возвращает массив с теми, что есть в запросе
    // это позволяет использовать код более универсально для разных форм
      function CheckValue($values) {
        foreach ($values as $val) {
          if (isset($_POST[$val])) {
            $req[$val] = htmlspecialchars($_POST[$val]);
          }
        }
        return $req;
      }

      // массив со списком имен полей, в данном случае для моего последнего проекта
      $inputs = CheckValue(array(
        'formName',
        'productName',
        'phone',
        'leasing-sum',
        'leasing-equipment',

        'stand-price',
        'average-price',
        'cars-per-day'

      ));

      $title = "Hunter";
      $body = getMsg($inputs);
      $file = $_FILES['myfile'];

    $mail->IsMail();
    $mail->CharSet = "UTF-8";
    $mail->From = 'haasson22@yandex.ru';
    $mail->From = 'Noreply@technovector7.ru';
    $mail->FromName = 'Заявка с сайта';
    // Получатель письма

    $mail->addAddress('haasson22@gmail.com');
    $mail->addAddress('Zayavka@technovector7.ru');

    // Прикрипление файлов к письму
    if (!empty($file['name'][0])) {
        for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
            $filename = $file['name'][$ct];
            if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }
    }
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отравленность сообщения
    if ($mail->send()) {
      $result = "success";
    }
    else {
      $result = "error";
    }

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
