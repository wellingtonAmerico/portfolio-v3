/* Elements */
const tiltElements = document.querySelectorAll(".tilt");

/* Config */
const MAX_ROTATE_X = 10;
const MAX_ROTATE_Y = 14;

const INITIAL_X = -8;
const INITIAL_Y = 4;

const SMOOTHING = 0.08;

/* Mouse */
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

/* State */
let currentX = INITIAL_X;
let currentY = INITIAL_Y;

/* Start */
if(tiltElements.length){

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseleave", resetMousePosition);

    animateTilt();

}

/* Events */
function updateMousePosition(event){

    mouse.x = event.clientX;
    mouse.y = event.clientY;

}

function resetMousePosition(){

    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;

}

/* Animation */
function animateTilt(){

    const targetX =
        ((mouse.x / window.innerWidth) - 0.5)
        * MAX_ROTATE_Y;

    const targetY =
        (0.5 - (mouse.y / window.innerHeight))
        * MAX_ROTATE_X;

    currentX += (targetX - currentX) * SMOOTHING;
    currentY += (targetY - currentY) * SMOOTHING;

    tiltElements.forEach((element) => {

        element.style.transform = `
            perspective(1800px)
            rotateY(${currentX}deg)
            rotateX(${currentY}deg)
        `;

    });

    requestAnimationFrame(animateTilt);

}