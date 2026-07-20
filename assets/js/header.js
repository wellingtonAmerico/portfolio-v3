/* Elements */
const header = document.getElementById("header");

/* Config */
const OPEN_AREA = 30;
const CLOSE_AREA = 260;

/* Start */
if(header){
    document.addEventListener("mousemove", handleHeaderMenu);
}

/* Functions */
function handleHeaderMenu(event){

    if(event.clientX <= OPEN_AREA){
        header.classList.add("open");
    }
    else if(event.clientX >= CLOSE_AREA){
        header.classList.remove("open");
    }

}