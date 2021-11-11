import Boundary from "./boundary";

// Проверяем, можно ли использовать Webp формат
function canUseWebp() {
   // Создаем элемент canvas
   let elem = document.createElement('canvas');
   // Приводим элемент к булеву типу
   if (!!(elem.getContext && elem.getContext('2d'))) {
      // Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
   }
   // Иначе Webp не используем
   return false;
}

export default function lazyLoading() {

   //
   // const bound = (options) => {
   //    return new Boundary(options)
   // }
   //

   let boundary = new Boundary({
      margins: { bottom: 1000, top: 1000 }
   })

   function lazyPicture(picture) {
      return () => {
         let img = picture.querySelector('img')
         let sources = picture.querySelectorAll('source')

         sources.forEach(source => source.srcset = source.dataset.srcset)
         img.src = img.dataset.src
         // picture.classList.add('fade')
         img.classList.add('fade')
         boundary.unWatch(picture)
      }
   }
   let images = document.querySelectorAll('picture.lazy')
   console.log(images)
   images.forEach(img => {
      boundary.watch(img, lazyPicture(img))
   })


   // let map = document.querySelector('.y-map')
   // if (map) {
   //    boundary.watch(map, () => {
   //       let mapAPI = document.querySelector('#y-map-api')
   //       mapAPI.src = mapAPI.dataset.src
   //       boundary.unWatch(map)
   //       setTimeout(() => {
   //          mapsInit()
   //       }, 1000);
   //    })
   // }


   let isFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
   let firefoxVer = isFirefox ? parseInt(isFirefox[1]) : 0;
   // Получаем все элементы с дата-атрибутом data-bg
   let blocks = document.querySelectorAll('[data-bg]');
   console.log(blocks)
   // Проходимся по каждому
   if (blocks) {
      blocks.forEach(block => {
         boundary.watch(block, lazyBg(block))
      })
   }
   function lazyBg(block) {
      return () => {
         let url = ''
         let images = block.dataset.bg.split(',')
         let isRetina = window.devicePixelRatio > 1

         images.forEach(image => {
            let src
            let [fileName, ext] = image.split('.')
            if (isRetina) fileName += '@2x'
            console.log(fileName)
            if (canUseWebp() || firefoxVer >= 65) {
               src = fileName + '.webp'
            } else {
               src = `${fileName}.${ext}`
            }
            url += `url(${src}), `
         })
         console.log(url.slice(0, -2))

         block.style.backgroundImage = url.slice(0, -2)
      }
   }

   let videos = document.querySelectorAll('video');
   videos.forEach(video => {
      boundary.watch(video, lazyPoster(video))
   })
   function lazyPoster(video) {
      return () => {
         let src
         let poster = video.dataset.poster
         if (!poster) return
         if (canUseWebp() || firefoxVer >= 65) {
            let pointPos = poster.lastIndexOf('.')
            let fileName = poster.slice(0, pointPos)
            src = fileName + '.webp'
         } else {
            src = poster
         }
         video.setAttribute('poster', src)
      }
   }
}
