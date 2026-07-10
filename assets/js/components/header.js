const header = document.getElementById("header");

document.addEventListener("mousemove",(e)=>{
    if(e.clientX<30){
        header.classList.add("open");
    }
    if(e.clientX>260){
        header.classList.remove("open");
    }
});