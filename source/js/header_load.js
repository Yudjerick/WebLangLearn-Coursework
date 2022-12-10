document.addEventListener('DOMContentLoaded', addHeaderAndFooter)

async function addHeaderAndFooter() {
    let header = await fetch("header.html").then((response) =>
        response.text()
    )

    let footer = await fetch("footer.html").then((response) =>
        response.text()
    )

    document.body.insertAdjacentHTML("afterbegin",header)
    document.body.insertAdjacentHTML("beforeend",footer)
    let burgerButton = document.querySelector('.burger');
    let pressed = false;
    let burgerMenu = document.querySelector('.burger-nav-container');
    burgerButton.onclick = (e)=>{
        e.preventDefault();
        if(pressed){
            pressed = false;
            burgerMenu.style.visibility = 'hidden';
            burgerButton.style.transform = 'rotate(0)';
        }
        else{
            pressed = true;
            burgerMenu.style.visibility = 'visible';
            burgerButton.style.transform = 'rotate(90deg)';
        }
    }
    window.onresize = (e)=>{
        e.preventDefault();
        pressed = false;
        burgerMenu.style.visibility = 'hidden';
    }
}

