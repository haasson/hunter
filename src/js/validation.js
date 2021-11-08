export default class ValidateForm {
   constructor(form, props) {
      this.form = form
      this.inputs = props.inputs
      this.onSubmit = props.onSubmit
      this.inputsCount = this.form.querySelectorAll('.validate-input').length
      this.validInputs = new Map()

      this.run()
   }

   run() {
      this.validate()
      this.submit()
   }

   validate() {
      for (const item in this.inputs) {
         let obj = this.inputs[item]
         let inputs = this.form.querySelectorAll(`input[type=${obj.type}].validate-input`)
         console.log(obj.type)

         inputs.forEach(input => {
            let inputParent = input.closest('.validate-field') || input

            input.addEventListener('focus', () => {
               console.log('here', inputParent)
               inputParent.classList.remove('validate-error')
            })

            if (obj.type === 'tel') {
               input.addEventListener('keyup', () => {
                  if (input.value.indexOf('_') === -1) {
                     this.setInputOk(inputParent)
                  } else {
                     this.setInputError(inputParent)
                  }
               })
            }
            else {
               input.addEventListener('keyup', () => {
                  if (input.value.match(obj.pattern)) {
                     this.setInputOk(inputParent)
                  }
                  else {
                     this.setInputError(inputParent)
                  }
               })
            }
         })
      }
   }

   setInputOk(field) {
      field.classList.add('validate-success')
      this.validInputs.set(field, null)
      this.checkValidInputsCount()
   }

   setInputError(field) {
      field.classList.remove('validate-success')
      this.validInputs.delete(field, null)
      this.checkValidInputsCount()
   }

   checkValidInputsCount() {
      if (this.inputsCount == this.validInputs.size) {
         this.form.classList.add('validate-form-valid')
      }
      else {
         this.form.classList.remove('validate-form-valid')
      }
   }

   submit() {
      this.form.addEventListener('submit', (e) => {
         e.preventDefault()

         if (this.form.classList.contains('validate-form-valid')) {
            this.onSubmit(e)
         }
         else {
            let inputs = this.form.querySelectorAll('.validate-input')
            inputs.forEach(input => {
               if (!input.classList.contains('validate-success')) {
                  input.classList.add('validate-error')
               }
            })
         }
      })
   }
}
