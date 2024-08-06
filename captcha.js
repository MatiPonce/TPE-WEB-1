"use strict";
document.addEventListener('DOMContentLoaded', () => {
let captchas = ['qGphJD', 'up3rd', 'W68HP', 'tFolSS', 'df5hd', 'P74GT'];
let captchaTexto = document.getElementById('captchaTexto');

let captchaInput = document.getElementById('captcha').value;


function resetearForm() {
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = ''; 
    document.getElementById('captcha').value = ''; 
}

function generarCaptcha() {
    let captchaRandom = Math.floor(Math.random()*captchas.length);
    captchaTexto.textContent = captchas[captchaRandom];
}



let form = document.getElementById("contactoForm");
form.addEventListener('submit', enviarFormulario); 

function enviarFormulario(e){
    e.preventDefault();
    if (captchaInput !== captchaTexto.textContent) {
        alert('Captcha incorrecto. Por favor, intente de nuevo.');
        generarCaptcha();
    }
    resetearForm();
};

});