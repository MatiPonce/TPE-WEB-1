"use strict";

let menuHamburguesa = document.querySelector(".menu-hamburguesa");
menuHamburguesa.addEventListener("click", desplegarMenu);

let modoTema = document.getElementById('modo-tema');
modoTema.addEventListener("click", cambiarModo);
    
function desplegarMenu(){
    let navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('abierto');
}    

function cambiarModo(){
    let cuerpo = document.getElementById('cuerpo');
    cuerpo.classList.toggle('modo-oscuro');
}
       


