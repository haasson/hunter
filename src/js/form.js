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
      new ValidateForm(form, {
         inputs: validateSettings,
         onSubmit: send
      })
   })
   $("[type=tel]").mask("+7 (999) 999-99-99", { autoclear: false });
}

function send(e) {
   let form = e.target
   let redirect = form.dataset.redirect
   let formData = $(form).serialize()
   regularAjax(formData, redirect)
}

function regularAjax(formData, redirect) {
   $.ajax({
      url: 'include/send.php',
      method: 'POST',

      data: decodeURI(formData),
      success: function success(data) {
         console.log('success');
         $(".modal-bg").fadeOut(300);
         document.body.style.overflow = 'auto'

         if (redirect) window.open(redirect, '_blank').focus();
         else $(".modal-ok").fadeIn(300);
      },
      error: function error(xhr) {
         alert('error - ' + xhr.status);
      },
      complete: function complete() {
         console.log(this.data);
      }
   });
}
