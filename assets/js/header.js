/* Header */
const header = document.getElementById("header");

/* Config */
const OPEN_AREA = 30;
const CLOSE_AREA = 260;

/* Mouse Interaction */
document.addEventListener("mousemove", (event) => {

    if (event.clientX <= OPEN_AREA) {
        header.classList.add("open");
    }
    else if (event.clientX >= CLOSE_AREA) {
        header.classList.remove("open");
    }
});