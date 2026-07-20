/* Element */
const typingElement = document.getElementById("typing-text");

/* Config */
const TYPE_SPEED = 110;
const DELETE_SPEED = 45;

const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 350;

/* Words */
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

/* Functions */
function updateText(word){
    typingElement.textContent = word.substring(0, charIndex);
}

function nextWord(){
    wordIndex = (wordIndex + 1) % words.length;
}

function animateTypeWriter(){

    const word = words[wordIndex];

    updateText(word);

    if(isTyping){

        charIndex++;

        if(charIndex <= word.length){
            setTimeout(animateTypeWriter, TYPE_SPEED);
            return;
        }

        isTyping = false;
        setTimeout(animateTypeWriter, PAUSE_AFTER_TYPE);
        return;
    }

    charIndex--;

    if(charIndex >= 0){
        setTimeout(animateTypeWriter, DELETE_SPEED);
        return;
    }

    isTyping = true;
    nextWord();

    setTimeout(animateTypeWriter, PAUSE_AFTER_DELETE);
}

/* Start */
if(typingElement){
    animateTypeWriter();
}