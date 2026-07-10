const header = document.getElementById("header");

const OPEN_AREA = 30;
const CLOSE_AREA = 260;

document.addEventListener("mousemove", (event) => {

    if (event.clientX <= OPEN_AREA) {
        header.classList.add("open");
    }

    if (event.clientX >= CLOSE_AREA) {
        header.classList.remove("open");
    }
});