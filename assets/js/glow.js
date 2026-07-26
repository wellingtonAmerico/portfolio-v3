/* Root */
const root = document.documentElement;

/* Start */
window.addEventListener("mousemove", updateGlow);
window.addEventListener("mouseleave", resetGlow);

/* Events */
function updateGlow(event){
    root.style.setProperty(
        "--cursor-x",
        `${event.clientX}px`
    );

    root.style.setProperty(
        "--cursor-y",
        `${event.clientY}px`
    );
}

function resetGlow(){
    root.style.setProperty(
        "--cursor-x",
        "50%"
    );

    root.style.setProperty(
        "--cursor-y",
        "50%"
    );
}

/* Card Glow */
document
    .querySelectorAll(".card-glow")
    .forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();

            card.style.setProperty(
                "--mx",
                `${event.clientX - rect.left}px`
            );

            card.style.setProperty(
                "--my",
                `${event.clientY - rect.top}px`
            );
        });
    });