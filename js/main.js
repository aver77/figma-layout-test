//если скроллим больше, чем на 50px, то применяется селектор header_active, если нет, то он убирается
(function start() {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if(window.pageYOffset > 50){
            header.classList.add('header_active');
        }
        else {
            header.classList.remove('header_active');
        }
    };
}());

//burger handler
//если кликаем на блок burger, то селектор header_nav меняется на header_nav_active (содержащий крестик)
//если кликаем на крестик, то header_nav_active убирается
(function() {
    const burgerItem=document.querySelector('.burger');
    const menu=document.querySelector('.header_nav');
    const menuCloseItem=document.querySelector('.header_nav_close');
    const menuLinks=document.querySelectorAll('.header_link')
    burgerItem.addEventListener('click',() => {
        menu.classList.add('header_nav_active');
   });
    menuCloseItem.addEventListener('click',()=>{
        menu.classList.remove('header_nav_active');
    });
    if (window.innerWidth<768){
        for (let i=0;i<menuLinks.length;i+=1){
            menuLinks[i].addEventListener('click',() => {
                menu.classList.remove('header_nav_active');
            });
        }
    }
}());

//scroll to Anchors (плавный + красивый переход по якорям)
(function () {

    //глобальная ф-ия
    const smoothScroll = function (targetEl, duration) {
        //высота header'a
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        //обработчик скролла, отвечающая за анимацию
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        //ф-ия анимации
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    //обработчики событий (срабатывание smoothScroll по клику)
    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());
