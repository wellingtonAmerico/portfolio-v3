/* Hero Image */
const heroImage = document.querySelector(".hero-image img");

if(heroImage){
    let mouseX = -8;
    let mouseY = 4;

    let currentX = -8;
    let currentY = 4;

    window.addEventListener("mousemove",(e)=>{
        mouseX = ((e.clientX/window.innerWidth)-0.5)*14;
        mouseY = (0.5-(e.clientY/window.innerHeight))*10;
    });

    window.addEventListener("mouseleave",()=>{
        mouseX=-8;
        mouseY=4;
    });

/* Animation */
    function animateHero(){
        currentX += (mouseX-currentX)*0.08;
        currentY += (mouseY-currentY)*0.08;

        heroImage.style.transform=`
            perspective(1800px)
            rotateY(${currentX}deg)
            rotateX(${currentY}deg)
        `;

        requestAnimationFrame(animateHero);
    }
    animateHero();
}

/* Hero Reveal */
const revealElements = document.querySelectorAll(".hero-reveal");

revealElements.forEach((element, index) => {
    setTimeout(() => {
        element.classList.add("show");
    }, 300 + index * 100);
});