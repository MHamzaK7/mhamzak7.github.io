document.addEventListener("DOMContentLoaded", function () {
    // Initializing the current slide
    let currentSlide = 1;
    // Initializing the first shown slide
    showSlide(currentSlide);

    // Function to handle the showing of slides
    function showSlide(index) {
        const slides = document.getElementsByClassName("mySlides");
        if (index < 1) {
            currentSlide = slides.length;
        } else if (index > slides.length) {
            currentSlide = 1;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Displaying the current slide
        slides[currentSlide - 1].style.display = "block";
    }

    // Using indexes to change slides
    function changeSlide(i) {
        currentSlide += i;
        showSlide(currentSlide);
    }

    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    prevButton.addEventListener("click", function () {
        changeSlide(-1);
    });

    nextButton.addEventListener("click", function () {
        changeSlide(1);
    });
});
