<?php

function getMsg($inputs) {
  $msg = '<table style="max-width: 1000px;font-family: sans-serif;border-collapse: collapse; border-top: 1px solid #a9a9a9;border-bottom: 1px solid #a9a9a9">';
  $msg .= '<caption style="font-size: 1.2em; font-weight: bold; padding: 10px 0">' . $inputs['reason'] . '</caption>';
  $counter = 1;
  $currentInputName = '';
  unset($inputs['reason']);

  foreach ($inputs as $inputName => $inputValue) {
    $name = $inputName;
    if (strcmp ($currentInputName, getRus($inputName)) === 0) {
      $counter++;
      $name = '';
    }
    $style = $counter%2 === 0 ? 'style="background-color: #efefef"' : '';
    $currentInputName = getRus($inputName);

    $msg .= '<tr ' . $style . '><td style="font-weight: bold; height: 2em;padding-right: 20px;padding-left: 10px;text-align: right">' .
      getRus($name) .
      '</td><td style="height: 1.5em;padding: 10px">' .
      $inputValue .
      '</td></tr>';

      $counter++;
  }

  $msg .= '</table>';

  return $msg;
  return $inputsg;
}

// код в этом файле формирует таблицу, для удобочитемости я прохожусь по именам полей
// и заменяю на более понятные текстовые строки
function getRus($val) {
  switch ($val) {
    case 'nameForm': return 'Имя формы';
    case 'phone': return 'Телефон';
    case 'leasing-sum': return 'Сумма лизинга';
    case 'leasing-equipment': return 'Для какого оборудования нужен лизинг';
    case 'stand-price': return 'Стоимость стенда';
    case 'average-price': return 'Средний чек по сход-развалу';
    case 'cars-per-day': return 'Количество машин в день';

    default: return $val;
  }
}
