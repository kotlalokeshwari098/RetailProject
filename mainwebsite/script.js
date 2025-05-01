let slideIndex = 1;
showSlides(slideIndex);

// Next/Previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail dot controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}
