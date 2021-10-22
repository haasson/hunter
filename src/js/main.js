import $ from 'jquery'
import 'select2'
import 'select2/dist/css/select2.css'

import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';

window.addEventListener('load', function () {
   //  SELECT2 (раскрывающийся список)
   $('.select2').select2({
      minimumResultsForSearch: Infinity,
      containerCssClass: 'custom-select',
      dropdownCssClass: 'custom-dropdown',
   })

   //  NOUISLIDER (бегунок)

      // const rangeEl = document.querySelector('[type=range]')
      // const rangeCount = document.querySelector('.range-count')
      const fakeRange = document.querySelector('.fake-range')
      const elementInput = document.querySelector('.input-price')
      if (fakeRange) {
         let uiSlider = noUiSlider.create(fakeRange, {
            start: 1350000,
            range: {
               'min': 500000,
               'max': 2500000
            },
            step: 50000,
            connect: [true, false],

            pips: {
               mode: 'values',
               values: [500000, 1000000, 1500000, 2000000, 2500000],
               density: 4,
               format: wNumb({
                  decimals: 0,
                  thousand: " ",
                  postfix: ' ₽'
               }),
            }
         })

         uiSlider.on('update', (values) => {
            console.log(values)
            elementInput.value = parseInt(values[0]) //Выводит значение в поле input, на котором  стоит бегунок
            // rangeEl.setAttribute('value', values[0])
            // rangeCount.innerHTML = values[0]
         });
      }
})
