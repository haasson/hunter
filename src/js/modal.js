import $ from "jquery";

export default function initModals() {
   $("[data-modal]").click(function () {
      const modalEl = $(`.modal-${this.dataset.modal}`)
      let modal = document.querySelector(`.modal-${this.dataset.modal}`)
      modalEl.fadeIn(300);
      document.body.style.overflow = 'hidden'
      modalEl.find('[type="tel"]').focus()


      const setLazyUrl = (el, url) => {
         let [name, ext] = url.split('.')
         let type = ext === 'jpg' ? 'jpeg': ext

         el
            .find('[type="image/webp"]').attr('srcset', `${name}@2x.webp 2x, ${name}.webp 1x`)
            .find(`[type="image/${type}"]`).attr('srcset', `${name}@2x.${ext} 2x, ${name}.${ext} 1x`)
            .find('img').attr('src', url)
      }

      const renderList = (el, list) => {
         let result = ''
         let items = list.split('@')
         items.forEach(item => {
            result += `<li class="item">${item}</li>`
         })
         el.find('.list').html(result)
      }

      if (this.dataset.modal === 'product') {
         let {title, text, img, list, price} = this.dataset
         modal.querySelector('.suptitle').innerHTML = text
         img && setLazyUrl(modalEl, img)
         list && renderList(modalEl, list)
         modal.querySelector('.price').innerHTML = price
         modal.querySelector('[name="productName"]').setAttribute('value', title.replaceAll('&#8209;', '-'))
      }

      if (this.dataset.modal === 'confirm') {
         let {title, action="Получить", redirect="", product=""} = this.dataset

         modal.querySelector('.title').innerHTML = title
         modal.querySelector('[name="formName"]').setAttribute('value', `${title} ${product}`.replaceAll('&#8209;', '-'))
         modal.querySelector('.btn').innerHTML = action
         modal.querySelector('form').setAttribute("data-redirect", redirect)
      }

   });

   $(".modal-bg").on('click', (e) => {
      if (e.target.closest('.modal-content')) return
      closeModal()
   })
   $(".modal-bg .close").on('click', () => {
      closeModal()
   })


   function closeModal() {
      $(".modal-bg").fadeOut(300);
      document.body.style.overflow = 'auto'

   }
}

function showFullProductInfo() {

}
