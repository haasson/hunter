import * as noUiSlider from "nouislider";
import wNumb from "wnumb";
import 'nouislider/dist/nouislider.css';
import './jquery.maskedinput.min'

export default function initRange() {
   //  NOUISLIDER (бегунок)

   const fakeRanges = document.querySelectorAll('.fake-range')
   fakeRanges.forEach(range => {
      let {start, min, max, step, tooltip, pips, postfix} = range.dataset

      console.log(pips)
      console.log(typeof pips)
      console.log([+min, +max])

      pips = pips ? pips.split(',').map(pip => +pip) : [+min, +max]

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
            values: pips,
            density: 4,
            format: wNumb({
               decimals: 0,
               thousand: " ",
               postfix: postfix,
            }),
         }
      })

      const linkedInput = range.dataset.range ? document.querySelector(`input[data-input=${range.dataset.range}]`) : null

      if (linkedInput) {
         linkedInput.addEventListener('change', (e) => {
            let value = e.target.value
            const formattedValue = parseInt(value.replaceAll(" ", ""))
            uiSlider.set(formattedValue)
         })
      }

      uiSlider.on('update', (values) => {
         const realRange = range.parentElement.querySelector('.real-range')
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
