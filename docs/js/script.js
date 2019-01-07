const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button--right');
const prevBtn = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

prevBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    let {prevSlide, prevDot} = '';
    if (currentSlide.previousElementSibling) {
        prevSlide = currentSlide.previousElementSibling;
        prevDot = currentDot.previousElementSibling;
    } else {
        prevSlide = slides[slides.length - 1];
        prevDot = dots[dots.length - 1];
    }

    moveToSlide(currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
});

nextBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    let {nextSlide, nextDot} = '';
    if (currentSlide.nextElementSibling) {
        nextSlide = currentSlide.nextElementSibling;
        nextDot = currentDot.nextElementSibling;
    } else {
        nextSlide = slides[0];
        nextDot = dots[0];
    }

    moveToSlide(currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
});

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});