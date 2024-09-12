document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('moonImage');
    const label = document.querySelector('.upload-label');
    const defaultLabelText = 'Choose a file';

    input.addEventListener('change', function(event) {
        const fileName = event.target.files[0] ? event.target.files[0].name : defaultLabelText;
        label.textContent = fileName;
    });

    // Carousel functionality
    const carouselOverlay = document.getElementById('carousel-overlay');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const tryButton = document.getElementById('tryButton');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function showCurrentSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);

    tryButton.addEventListener('click', () => {
        carouselOverlay.style.display = 'none';
    });

    // setInterval(nextSlide, 7000); 

    window.prevSlide = prevSlide;
    window.nextSlide = nextSlide;
    window.showCurrentSlide = showCurrentSlide;
});

document.getElementById('form').addEventListener('click', clearFileInput)

function clearFileInput() {
    // var fileInput = document.getElementById('moonImage');
    // fileInput.value = ''; // Clear the file input value
    var label = document.querySelector('.upload-label');
    label.textContent = 'Choose another file'; // Reset the label text
}