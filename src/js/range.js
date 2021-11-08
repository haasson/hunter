import * as noUiSlider from "nouislider";
import wNumb from "wnumb";
import 'nouislider/dist/nouislider.css';
import './jquery.maskedinput.min'

export default function initRange() {
   //  NOUISLIDER (бегунок)

   const fakeRanges = document.querySelectorAll('.fake-range')
   fakeRanges.forEach(range => {
      console.log(range)
      console.log(range.dataset)
      const {start, min, max, step, tooltip, postfix} = range.dataset

      let uiSlider = noUiSlider.create(range, {
         start: +start,
         range: { min: +min, max: +max },
         step: +step,
         postfix: postfix,
         connect: [true, false],

         tooltips: tooltip ? wNumb({
            decimals: 0,
            thousand: " ",
            postfix: postfix,
         }) : false,

         pips: {
            mode: 'values',
            values: [+min, +max],
            density: 4,
            format: wNumb({
               decimals: 0,
               thousand: " ",
               postfix: postfix,
            }),
         }
      })

      const linkedInput = range.dataset.range ? document.querySelector(`input[data-input=${range.dataset.range}]`) : null
      console.log(range.dataset)

      if (linkedInput) {
         linkedInput.addEventListener('change', (e) => {
            let value = e.target.value
            // if (value < min) value = min
            // else if (value > max) value = max

            const formattedValue = parseInt(value.replaceAll(" ", ""))
            uiSlider.set(formattedValue)
            // realRange.setAttribute('value', value)
         })
      }

      uiSlider.on('update', (values) => {
         const realRange = range.parentElement.querySelector('.real-range')
         console.log(realRange, parseInt(values[0]))
         realRange.setAttribute('value', parseInt(values[0]))
         realRange.value = values[0]

         if (linkedInput) {
            const format = wNumb({
               decimals: 0,
               thousand: " ",
            })
            const value = format.to(+values[0])
            linkedInput.setAttribute('value', value)
            linkedInput.value = value


         }
      });
   })
}
