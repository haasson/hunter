import $ from "jquery";
import slick from 'slick-slider'



export default function initSliders() {

   $('.kits .list').slick({
      infinite: false,
      arrows: false,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2
            }
         },
         {
            breakpoint: 568,
            settings: {
               slidesToShow: 1
            }
         }
      ]
   });
}
