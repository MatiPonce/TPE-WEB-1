"use strict";

document.addEventListener('DOMContentLoaded', function() {
    let links = document.querySelectorAll('.ruta');

    for (let i = 0; i < links.length; i++) {

        links[i].addEventListener('click', async function(event) {
            event.preventDefault(); 

            const href = event.target.getAttribute('href'); 

            try {
                const response = await fetch(href); 
                if (response.ok) { 
                    const html = await response.text(); 
                    document.querySelector('#cuerpo').innerHTML = html; 
                } else {
                    console.error('Error'); 
                }
            } catch (error) {
                console.error('Error'); 
            }
        });
    }
});
