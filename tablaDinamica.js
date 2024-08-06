"use strict";

const url = 'https://66a3fc5644aa63704583130e.mockapi.io/planes'; 
let limite = 5;
let paginaActual = 1; 
 
async function cargarTabla() { 
    let response = await fetch(`${url}?page=${paginaActual}&limit=${limite}`);
    let planes = await response.json();
    

    let tbody = document.getElementById('cuerpoTabla'); 
    let filtroDuracion = document.getElementById("duracionFiltro");
    tbody.innerHTML = ''; 
    let duracionSeleccionada = filtroDuracion.value;

    let planesFiltrados = [];

    if (duracionSeleccionada === "") {
        planesFiltrados = planes; 
    } else {
        for (let i = 0; i < planes.length; i++) {
            if (planes[i].duracion === duracionSeleccionada) {
                planesFiltrados.push(planes[i]); 
            }
        }
    }

    for (let i = 0; i < planesFiltrados.length; i++) {
        let plan = planesFiltrados[i];

        let tr = document.createElement('tr'); 
        let tdPlan = document.createElement('td');
        let tdDuracion = document.createElement('td');
        let tdPrecio = document.createElement('td');
        let tdAcciones = document.createElement('td');
        let btnEditar = document.createElement('button');
        btnEditar.classList.add("btnEditar");
        let btnBorrar = document.createElement('button');
        btnBorrar.classList.add("btnBorrar");
    
        tdPlan.textContent = plan.plan;
        tdDuracion.textContent = plan.duracion + " Meses";
        tdPrecio.textContent ="$ " + plan.precio;
        btnEditar.textContent = "Editar";
        btnBorrar.textContent = "Borrar";
    
        btnEditar.addEventListener("click", () => cargarPlanParaEditar(plan));
        btnBorrar.addEventListener("click", () => borrarPlan(plan.id));
    
        tr.appendChild(tdPlan);
        tr.appendChild(tdDuracion);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdAcciones);
        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnBorrar);
        
        tbody.appendChild(tr); 
    }
    
}


async function agregarPlan(nuevoPlan) {
    await fetch(url, { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(nuevoPlan) 
    });

    cargarTabla(); 
    resetearForm(); 
}

async function borrarPlan(id) { 
    await fetch(`${url}/${id}`, { 
        method: 'DELETE' 
    });
    cargarTabla(); 
}


async function actualizarPlan(id, plan) { 
    try {
        await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plan)
        });

        cargarTabla();
        resetearForm();
    } catch (error) {
        console.error('Error');
    }
   
}

async function agregarOeditarPlan(event) {
    event.preventDefault();

    let id = document.getElementById('planId').value;
    let plan = document.getElementById('plan').value;
    let duracion = document.getElementById('duracion').value;
    let precio = document.getElementById('precio').value;

    let planData = { plan, duracion, precio };

    if (id) {
        await actualizarPlan(id, planData);
    } else {
        await agregarPlan(planData);
    }
}

function cargarPlanParaEditar(plan) {
    document.getElementById('planId').value = plan.id;
    document.getElementById('plan').value = plan.plan;
    document.getElementById('duracion').value = plan.duracion;
    document.getElementById('precio').value = plan.precio;
    document.getElementById('submitBtn').textContent = "Actualizar";
}
function resetearForm() {
    document.getElementById('planId').value = '';
    document.getElementById('plan').value = '';
    document.getElementById('duracion').value = ''; 
    document.getElementById('precio').value = '';
    document.getElementById('submitBtn').textContent = "Agregar"; 
}

async function agregarTres() {
    let plan = document.getElementById('plan').value;
    let duracion = document.getElementById('duracion').value;
    let precio = document.getElementById('precio').value;

    if(plan !=="" && duracion !=="" && precio !==""){
        let planData = { plan, duracion, precio };
        for (let i = 0; i < 3; i++) {
            await agregarPlan(planData);
        }
    }
   
}
async function manejadorCambioPagina(direccion) {
    if (direccion === 'anterior' && paginaActual > 1) {
        paginaActual--;
    } else if (direccion === 'siguiente') {
        paginaActual++;
    }
    await cargarTabla();
}

document.getElementById('btnAnterior').addEventListener('click', () => manejadorCambioPagina('anterior'));
document.getElementById('btnSiguiente').addEventListener('click', () => manejadorCambioPagina('siguiente'));
window.onload = cargarTabla;
document.getElementById('duracionFiltro').addEventListener('change', cargarTabla);
document.getElementById('planesForm').addEventListener('submit', agregarOeditarPlan);
document.getElementById('submitBtn3').addEventListener('click', agregarTres);
