import ValidateForm from "./validation";
import $ from "jquery";

export default function initForms() {
   let forms = [...document.querySelectorAll('form')]
   let validateSettings = {
      phone: {
         type: 'tel'
      }
   }

   forms.forEach(form => {
      console.log(form)
      new ValidateForm(form, {
         inputs: validateSettings,
         onSubmit: send
      })
   })
   $("[type=tel]").mask("+7 999 999 9999", { autoclear: false });
}

function send(e) {
   console.log(e)
   let form = e.target
   let formData = $(form).serialize()
   regularAjax(formData)
}

function regularAjax(formData) {
   $.ajax({
      url: 'include/send.php',
      method: 'POST',

      data: decodeURI(formData),
      success: function success(data) {
         console.log('success');
         $(".modal-bg").fadeOut(300);
         $(".modal-ok").fadeIn(300);
         console.log(data);
      },
      error: function error(xhr) {
         // window.open('http://google.com', '_blank').focus();
         alert('error - ' + xhr.status);
      },
      complete: function complete() {
         console.log(this.data);
      }
   });
}
