/* Elements */
const header = document.getElementById("header");
const menuButton = document.getElementById("menu-button");
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-link");

/* Config */
const OPEN_AREA = 20;
const CLOSE_AREA = 260;
const isTouch = window.matchMedia("(hover: none)").matches;

/* Start */
if(header){
    menuButton.addEventListener(
        "click",
        toggleMenu
    );

    if(!isTouch){
        document.addEventListener(
            "mousemove",
            handleHeaderMenu
        );
    }

    navLinks.forEach((link)=>{
        link.addEventListener(
            "click",
            closeMenu
        );
    });
}

/* Scroll Spy */
const sectionObserver =
    new IntersectionObserver(
        updateActiveSection,
        {
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0
        }
    );

sections.forEach((section) => {
    sectionObserver.observe(section);
});

/* Functions */
function handleHeaderMenu(event){
    if(event.clientX <= OPEN_AREA){
        openMenu();
    }

    else if(event.clientX >= CLOSE_AREA){
        header.classList.remove("open");
    }
}

function toggleMenu(){
    if(header.classList.contains("open")){
        closeMenu();
    }
    else{
        openMenu();
    }
}

function closeMenu(){
    header.classList.remove("open");
    navLinks.forEach((link) => {
        link.classList.remove("show");
    });
}

function animateMenuLinks(){
    navLinks.forEach((link, index) => {
        link.classList.remove("show");
        setTimeout(() => {
            if(header.classList.contains("open")){
                link.classList.add("show");
            }
        }, 220 + (index * 90));
    });
}

function updateActiveSection(entries){
    entries.forEach((entry) => {
        if(!entry.isIntersecting){
            return;
        }

        const id = entry.target.id;

        navLinks.forEach((link) => {
            const isActive =
                link.getAttribute("href") === `#${id}`;

            link.classList.toggle(
                "active",
                isActive
            );
        });
    });
}

document.addEventListener("click", (event)=>{
    if(
        !header.contains(event.target)
    ){
        closeMenu();
    }
});

if(isTouch){
    document.addEventListener(
        "click",
        handleOutsideClick
    );
}

function openMenu(){
    if(header.classList.contains("open")){
        return;
    }
    header.classList.add("open");
    animateMenuLinks();
}