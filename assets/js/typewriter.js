/* Element */
const typingElement = document.getElementById("typing-text");

/* Config */
const TYPE_SPEED = 110;
const DELETE_SPEED = 45;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 350;

/* Typewriter Words */
const words = [
    "Web Applications",
    "Backend Systems",
    "Data Automations",
    "IoT Solutions",
    "Power BI Dashboards",
    "AI Integrations"
];

/* State */
let wordIndex = 0;
let charIndex = 0;
let isTyping = true;

/* Animation */
function animateTypeWriter(){
    const word = words[wordIndex];

    if(isTyping){
        typingElement.textContent = word.substring(0, charIndex);
        charIndex++;

        if(charIndex <= word.length){
            setTimeout(animateTypeWriter, TYPE_SPEED);
        }else{
            isTyping = false;
            setTimeout(animateTypeWriter, PAUSE_AFTER_TYPE);
        }
    }else{
        typingElement.textContent = word.substring(0, charIndex);
        charIndex--;

        if(charIndex >= 0){
            setTimeout(animateTypeWriter, DELETE_SPEED);
        }else{
            isTyping = true;
            wordIndex = (wordIndex + 1) % words.length;

            setTimeout(animateTypeWriter, PAUSE_AFTER_DELETE);
        }
    }
}

/* Start */
if(typingElement){
    animateTypeWriter();
}