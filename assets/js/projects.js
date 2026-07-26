/* Elements */

const track = document.querySelector(".projects-track");
const cards = document.querySelectorAll(".project-card");
const previousButton = document.querySelector(".slider-btn.prev");
const nextButton = document.querySelector(".slider-btn.next");
const pagination = document.querySelector(".projects-pagination");

/* Config */
const AUTO_PLAY_DELAY = 6000;

/* State */
let currentIndex = 0;
let autoPlay;

/* Start */
if(track && cards.length){
    createPagination();
    updateSlider();
    previousButton.addEventListener("click", previousSlide);
    nextButton.addEventListener("click", nextSlide);
    startAutoPlay();
    track.addEventListener("mouseenter", stopAutoPlay);
    track.addEventListener("mouseleave", startAutoPlay);
}

/* Slider */
function updateSlider(){
    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;
    updatePagination();
}

function nextSlide(){
    currentIndex++;

    if(currentIndex >= cards.length){
        currentIndex = 0;
    }

    updateSlider();
}

function previousSlide(){
    currentIndex--;

    if(currentIndex < 0){
        currentIndex = cards.length - 1;
    }

    updateSlider();

}

/* Pagination */
function createPagination(){
    cards.forEach((_, index)=>{
        const dot = document.createElement("button");
        dot.className = "pagination-dot";
        dot.addEventListener("click", ()=>{
            currentIndex = index;
            updateSlider();
        });
        pagination.appendChild(dot);
    });

}

function updatePagination(){
    const dots = pagination.querySelectorAll(".pagination-dot");
    dots.forEach((dot,index)=>{
        dot.classList.toggle(
            "active",
            index === currentIndex
        );
    });
}

/* Auto Play */
function startAutoPlay(){
    stopAutoPlay();
    autoPlay = setInterval(() => {
        nextSlide();
    }, AUTO_PLAY_DELAY);
}

function stopAutoPlay(){
    clearInterval(autoPlay);
}