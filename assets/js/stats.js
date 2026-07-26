/* Elements */
const statNumbers = document.querySelectorAll(".stat-number");
const skillCards = document.querySelectorAll(".skill-card");

/* Config */
const OBSERVER_THRESHOLD = 0.35;
const FRAME_DURATION = 2500;

/* Observer */
const statsObserver = new IntersectionObserver(
    handleIntersection,
    {
        threshold: OBSERVER_THRESHOLD
    }
);

/* Start */
statNumbers.forEach((number) => {
    statsObserver.observe(number);
});

if(skillCards.length){
    statsObserver.observe(skillCards[0]);
}

/* Observer Callback */
function handleIntersection(entries){
    entries.forEach((entry) => {
        if(!entry.isIntersecting){
            return;
        }
        if(entry.target.classList.contains("stat-number")){
            animateCounter(entry.target);
        }
        if(entry.target.classList.contains("skill-card")){
            animateSkillBars();
        }
        statsObserver.unobserve(entry.target);
    });
}

/* Counter */
function animateCounter(element){
    const target = Number(element.dataset.target);
    const suffix = element.dataset.suffix || "";
    const isInfinity = element.dataset.infinity === "true";
    const duration =
        Number(element.dataset.duration) || FRAME_DURATION;
    let startTime = null;
    function update(timestamp){
        if(!startTime){
            startTime = timestamp;
        }

        const progress = Math.min(
            (timestamp - startTime) / duration,
            1
        );

        const value = Math.floor(progress * target);

        if(isInfinity){
            if(progress < 1){
                element.textContent = value;
            }else{
                element.textContent = suffix;
            }
        }else{
            element.textContent = `${value}${suffix}`;
        }

        if(progress < 1){
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

/* Skills */
function animateSkillBars(){
    skillCards.forEach((card, index) => {
        const level =
            card.style.getPropertyValue("--level");
        setTimeout(() => {
            card.style.setProperty(
                "--progress",
                level
            );
        }, index * 120);
    });
}