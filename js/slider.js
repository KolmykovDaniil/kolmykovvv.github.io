//cлайдер
let slider = document.querySelector(".slider")
//количество фото
let amountOfPhotos = 15;
//скейл анимации (подбирается вручную)
let animationScale = 140;

//функция для стартового клонирования дивов
function cloneDivs(){
    //находим оригинальный див
    let originalItem = document.querySelector(".slider-item");
    let cloneItem;
    for (let i = 0; i < amountOfPhotos-1; i++) {
        //клонируем ноду
        cloneItem = originalItem.cloneNode(true);
        //добаавляем к слайдеру
        slider.appendChild(cloneItem);
    }
}

//функция для отрисовки изображений в контейнерах
function drawImages(){
    //получаем все дивы для изображений
    let images = [...document.querySelectorAll(".img-div")];
    shuffleArray(images);
    images.forEach((image, idx) =>{
        //в отдельности для каждого добавляем фото как фон
        image.style.backgroundImage = `url(./resources/photos/${idx}.jpg)`;
    })
}

//функция перемешивания массива
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

//установка значения оффсета для скролла
function setScrollPos(pos){
    //выбор пал на относительную величину vmax , так как необходимо, чтобы скорость оставалась примерно одинаковой н алюбом разрешении экрана
    slider.style.transform = `translateX(${-pos}vmax)`;
}

//функция для получения оффсета элемента по X. Взята тут: https://zellwk.com/blog/css-translate-values-in-javascript/
function getTranslateValues (element) {
    const style = window.getComputedStyle(element);
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform;
  
    // No transform property. Simply return 0 values.
    if (matrix === 'none' || typeof matrix === 'undefined') {
      return {
        x: 0,
        y: 0,
        z: 0
      }
    }
  
    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d';
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

    if (matrixType === '2d') {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0
      }
    }
    
}

//функция возвращает значение расстояния правого края слайдера до правого края экрана
function getScrollPos(){
    //получаем значение оффсета Х от анимации в пикселах
    let x = parseInt(getTranslateValues(slider)['x']);
    //получаем размеры слайдера
    let width = slider.getBoundingClientRect().width;
    //получаем ширину вьюпорта
    let intViewportWidth = window.innerWidth;
    //простая арифметика
    return x + width - intViewportWidth;
}

function animateScroll() {
    let flag = true;
    //время запуска анимации
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction;
        //вычисление шага анимации
        timeFraction = (time - start) / animationScale;
        //если мы близко к краю - клонируем изображения
        if(getScrollPos() < 500 && flag){
          flag = false;
          $("body").fadeOut(1000, ()=>{
            start = performance.now();
            drawImages();
          });
          $("body").fadeIn(1000, () => {
            flag = true;
          });
        }
        // вычисление текущего состояния анимации
        setScrollPos(timeFraction); // отрисовка анимации

        requestAnimationFrame(animate);
    });
}

$(document).ready(() => {
  cloneDivs();
  drawImages();
  animateScroll();
});