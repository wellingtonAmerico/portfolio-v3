/* Elements */
const tiltElements = document.querySelectorAll(".tilt");

/* Config */
const MAX_ROTATE_X = 10;
const MAX_ROTATE_Y = 14;

const INITIAL_X = -8;
const INITIAL_Y = 4;

const SMOOTHING = 0.08;

/* State */
const tiltState = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    currentX: INITIAL_X,
    currentY: INITIAL_Y
};

/* Start */
if(tiltElements.length){

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseleave", resetMousePosition);

    animateTilt();

}

/* Events */
function updateMousePosition(event){

    tiltState.mouseX = event.clientX;
    tiltState.mouseY = event.clientY;

}

function resetMousePosition(){

    tiltState.mouseX = window.innerWidth / 2;
    tiltState.mouseY = window.innerHeight / 2;

}

/* Animation */
function animateTilt(){

    const targetX =
        ((tiltState.mouseX / window.innerWidth) - 0.5)
        * MAX_ROTATE_Y;

    const targetY =
        (0.5 - (tiltState.mouseY / window.innerHeight))
        * MAX_ROTATE_X;

    tiltState.currentX +=
        (targetX - tiltState.currentX) * SMOOTHING;

    tiltState.currentY +=
        (targetY - tiltState.currentY) * SMOOTHING;

    tiltElements.forEach((element) => {

        element.style.transform = `
            perspective(1800px)
            rotateY(${tiltState.currentX}deg)
            rotateX(${tiltState.currentY}deg)
        `;

    });

    requestAnimationFrame(animateTilt);

}