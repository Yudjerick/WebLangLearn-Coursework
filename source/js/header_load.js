document.addEventListener('DOMContentLoaded', addHeaderAndFooter)

async function addHeaderAndFooter() {
let header = await fetch("header.html").then((response) =>
response.text()
)
//header.classList.add(".header")
let footer = await fetch("footer.html").then((response) =>
response.text()
)
//footer.classList.add(".footer")
document.body.insertAdjacentHTML("afterbegin",header)
document.body.insertAdjacentHTML("beforeend",footer)
let burgerButton = document.querySelector('.burger');
let pressed = false;
let burgerMenu = document.querySelector('.burger-nav-container');
burgerButton.onclick = (e)=>{
    e.preventDefault();
    console.log(1);
    if(pressed){
        pressed = false;
        burgerMenu.style.visibility = 'hidden';
    }
    else{
        pressed = true;
        burgerMenu.style.visibility = 'visible';
    }
}
window.onresize = (e)=>{
    e.preventDefault();
    pressed = false;
    burgerMenu.style.visibility = 'hidden';
}
}