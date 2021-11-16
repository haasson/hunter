export default class Quiz {
   constructor(props = {}) {
      const {onFinish = () => {}, changeOnChoose} = props
      this.quiz = document.querySelector('.q-body')

      this.form = this.quiz.querySelector('form')
      this.changeOnChoose = changeOnChoose
      // Blocks
      this.previewBlock = this.quiz.querySelector('.q-preview')
      this.previewBtn = this.previewBlock.querySelector('.q-preview-btn')
      this.mainBlock = this.quiz.querySelector('.q-main')
      this.questions = this.quiz.querySelector('.q-questions')
      this.steps = [...this.questions.children]
      this.fakeCalcBlock = document.querySelector('.q-fake-block')
      this.finalBlock = this.quiz.querySelector('.q-final')
      // Progress
      this.progressSteps = [...this.quiz.querySelector('.q-progress-steps').children]
      this.progressBar = this.quiz.querySelector('.q-progress-bar')
      // Counter
      this.countCurrent = this.quiz.querySelector('.q-current-count')
      this.countTotal = this.quiz.querySelector('.q-total-count')
      // Controls
      this.prevBtn = this.quiz.querySelector('.q-btn-prev')
      this.nextBtn = this.quiz.querySelector('.q-btn-next')
      // Extra blocks
      this.extraBlocks = this.quiz.querySelectorAll('.q-extra')

      this.step = 0
      this.quizLength = this.steps.length
      this.onFinish = onFinish

      this.run()
   }

   run() {
      // this.steps = [...this.stepsBlock.children]
      // this.progressSteps = this.progressStepsBlock && [...this.progressStepsBlock.children]
      this.setEvents()
      this.hideBlock(this.finalBlock)
      if (this.fakeCalcBlock) this.hideBlock(this.fakeCalcBlock)
      // If there is a preview block - show it, otherwise show first slide
      if (this.previewBlock) {
         this.hideBlock(this.mainBlock)
      } else {
         this.setStep(0)
      }
   }

   setEvents() {
      this.previewBtn && this.previewBtn.addEventListener('click', this.startQuiz.bind(this, 'prev'))
      this.prevBtn && this.prevBtn.addEventListener('click', this.clickBtn.bind(this, 'prev'))
      this.nextBtn && this.nextBtn.addEventListener('click', this.clickBtn.bind(this, 'next'))
      if (this.changeOnChoose) {
         this.form.addEventListener('click', this.clickOnRadio.bind(this))
      }
   }

   startQuiz() {
      this.hideBlock(this.previewBlock)
      this.showBlock(this.mainBlock)
      this.setStep(0)
   }

   clickBtn(btnType) {
      if(btnType === 'prev') {
         this.setStep(this.step - 1)
      } else {
         this.setStep(this.step + 1)
      }
   }

   clickOnRadio(e) {
      if (e.target.getAttribute('type') === 'radio') {
         setTimeout(() => {
            this.setStep(this.step + 1)
         }, 200);
      }
   }

   setStep(step) {
      this.scrollTop()
      if(step > this.quizLength - 1) {
         this.hideBlock(this.mainBlock)
         if (this.fakeCalcBlock) {
            this.doFakeCalculation()
         } else {
            this.showBlock(this.finalBlock)
            this.onFinish()
         }

         return
      }
      this.step = step
      this.showSlide()

      if (this.countCurrent) {
         this.setCount()
      }
      if(this.progressBar) {
         this.actualizeProgressBar()
      }
      if(this.progressSteps) {
         this.actualizeProgressSteps()
      }
      if(this.extraBlocks.length) {
         this.showExtraBlock()
      }

   }

   showSlide() {
      this.steps.forEach((item) => {
         this.hideBlock(item)
      })
      this.showBlock(this.steps[this.step])

      if(this.prevBtn) {
         this.step === 0 ? this.hideBlock(this.prevBtn) : this.showBlock(this.prevBtn)
      }
   }

   setCount() {
      if(!this.totalSet && this.countTotal) {
         this.countTotal.innerHTML = this.quizLength
         this.totalSet = true
      }
      this.countCurrent.innerHTML = this.step + 1
   }

   scrollTop() {
      let startPosition = this.getCoords(this.quiz).top
      if (document.documentElement.clientWidth <= 992) {
         window.scrollTo(0, startPosition - 70)
      }
   }

   getCoords(elem) {
      let box = elem.getBoundingClientRect();
      return {
         top: box.top + window.pageYOffset,
         left: box.left + window.pageXOffset
      }
   }

   hideBlock(block) {
      block.style.display = 'none'
   }

   showBlock(block) {
      block.style.display = 'inherit'
   }

   actualizeProgressBar() {
      let activeBar = this.progressBar.querySelector('div')
      let width = (this.step + 1) / this.steps.length * 100
      activeBar.style.width = `${width}%`
   }

   actualizeProgressSteps() {
      this.progressSteps.forEach((item, i) => {
         item.classList.remove('done', 'current')
         if (i < this.step) {
            item.classList.add('done')
         } else if (i === this.step) {
            item.classList.add('current')
         }
      })
   }

   showExtraBlock() {
      this.extraBlocks.forEach((item) => {
         let video = item.querySelector('video')
         item.classList.add('hide')
         if (video) {
            video.pause()
         }
         if(item.classList.contains(`advice__item_${this.step+1}`)) {
            item.classList.remove('hide')
         }
      })
   }

   doFakeCalculation() {
      const totalTime = 7000
      this.showBlock(this.fakeCalcBlock)
      let progressBar = this.fakeCalcBlock.querySelector('.q-fake-progress')
      let list = [...this.fakeCalcBlock.querySelector('.q-fake-list').children]
      let timePerItem = totalTime / list.length
      let currentIdx = 0

      const setActiveItem = () => {
         if (currentIdx === list.length) {
            clearInterval(interval)
            this.hideBlock(this.fakeCalcBlock)
            this.showBlock(this.finalBlock)
            return
         }

         let progressPct = currentIdx / list.length * 100
         progressBar.style.width = `${progressPct}%`

         if (currentIdx !== 0) {
            const currentItem = list[currentIdx - 1]
            currentItem.classList.add('done')
            currentItem.classList.remove('active')
         }
         list[currentIdx].classList.add('active')

         currentIdx++
      }

      const interval = setInterval(setActiveItem, timePerItem)
      setActiveItem()
   }
}
