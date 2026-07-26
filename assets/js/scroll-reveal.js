/* Reveal Elements */
const revealElements = document.querySelectorAll(".reveal");

/* Observer */
const revealObserver = new IntersectionObserver(handleReveal, {
    threshold: 0.15
});

/* Observe Elements */
revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* Functions */
function handleReveal(entries, observer){
    entries.forEach((entry) => {
        if(!entry.isIntersecting){
            return;
        }
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}