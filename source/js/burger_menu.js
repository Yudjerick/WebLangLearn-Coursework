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