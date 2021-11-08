import $ from "jquery";

export default function initModals() {
   $("[data-modal]").click(function () {
      const modalEl =  $(`.modal-${this.dataset.modal}`)
      modalEl.fadeIn(300);
      document.body.style.overflow = 'hidden'


      const setLazyUrl = (el, url) => {
         console.log(url)
         let [name, ext] = url.split('.')
         ext = ext === 'jpg' ? 'jpeg': ext
         el.find('[type="image/webp"]').attr('srcset', `${name}.webp`)
         el.find(`[type="image/${ext}"]`).attr('srcset', url)
         el.find('img').attr('src', url)
      }

      const renderList = (el, list) => {
         let result = ''
         let items = list.split('@')
         items.forEach(item => {
            result += `<li class="item">${item}</li>`
         })
         el.find('.list').html(result)
      }

      if (this.dataset.modal === 'product' || this.dataset.modal === 'confirm') {
         let {title, text, img, list, price} = this.dataset
         title && modalEl.find('.title').html(title)
         text && modalEl.find('.suptitle').html(text)
         img && setLazyUrl(modalEl, img)
         list && renderList(modalEl, list)
         price && modalEl.find('.price').html(price)
      }
   });

   $(".modal-bg").on('click', (e) => {
      if (e.target.closest('.modal-content')) {
         return
      }
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
