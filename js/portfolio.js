// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// функция для отключения возожности скролла
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// функция для разрешения скролла
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
//Функции взяты с сайта: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily


//максимальная ширина экрана, при которой работает анимация
let maxWidth = 1500
//Модал - экран затемнения
let modal = document.getElementById('myModal');
modal.onclick = function(){
    if (document.documentElement.clientWidth+16 > maxWidth){
      modal.style.display = "none";
      enableScroll();
    }
}
//Картинка в модале
let modalImg = document.getElementById("modal-img");
let images = document.querySelectorAll(".portfolio-img");
images.forEach((img) => {
    img.onclick = function(){
        if (document.documentElement.clientWidth+16 > maxWidth){
          modal.style.display = "block";
          modalImg.src = this.src;
          disableScroll();
        }
    }
})
