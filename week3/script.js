let currentSlide = 1;

function showSlide(index) {
    const slides = document.getElementsByClassName("mySlides");
    if (index < 1) {
        currentSlide = slides.length;
    }
    else if (index > slides.length) {
        currentSlide = 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[currentSlide - 1].style.display = "block";
}

function changeSlide(i) {
    currentSlide += i;
    showSlide(currentSlide);
}

showSlide(currentSlide);