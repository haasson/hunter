import $ from 'jquery'
import 'select2'
import 'select2/dist/css/select2.css'

import initSliders from "./sliders";


import Quiz from "./quiz";
import initSelect from "./select2";
import initRange from "./range";
import initModals from "./modal";
import initForms from "./form";
import lazyLoading from "./lazyLoading";


window.addEventListener('load', function () {
   initSliders()
   initSelect()
   initRange()
   initModals()
   initForms()
   lazyLoading()

   burgerHandler()
   menuHandler()
   scrollHandler()
   showAllProducts()


   if (document.querySelector('.quiz')) new Quiz()
})


function burgerHandler() {
   let burger = document.querySelector(".j-burger")
   let menu = document.querySelector(".j-menu")
   const toggle = () => {
      menu.classList.toggle("active")
      burger.classList.toggle("active")
   }
   burger.addEventListener("click", toggle)
}


function menuHandler() {
   let burger = document.querySelector(".j-burger")
   let menu = document.querySelector(".j-menu")
   $("[data-scroll]").on("click", function (event) {
      event.preventDefault();

      menu.classList.remove("active")
      burger.classList.remove("active")

      let elementId = $(this).data('scroll');
      let elementOffset = $('#' + elementId).offset().top

      $("html, body").animate({
         scrollTop: elementOffset - 70
      }, 700)

   })
}

function scrollHandler() {
   if (document.documentElement.clientWidth > 1200) {
      let menu = document.querySelector(".topline")
      const toggleTopline = () => window.scrollY > 15 ? menu.classList.add('dark') : menu.classList.remove('dark')
      document.addEventListener('scroll', toggleTopline, {passive: true})
      toggleTopline()
   }
}

function showAllProducts() {
   const products = document.querySelectorAll('.products .item')
   const triggerBtn = document.querySelector('.products .all')

   triggerBtn.addEventListener('click', () => {
      products.forEach(product => {
         product.classList.add('flex')
         triggerBtn.classList.add('hide')
      })
   })
}

