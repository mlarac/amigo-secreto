let amigos = [];

document.addEventListener('DOMContentLoaded', () => {
    const btnAgregar = document.querySelector('.button-add');
    const btnSortear = document.querySelector('.button-draw');

    btnAgregar.addEventListener('click', agregarAmigo);
    btnSortear.addEventListener('click', sortearAmigoSecreto);

    // Permitir agregar amigo presionando Enter en el input
    const inputAmigo = document.getElementById('amigo');
    inputAmigo.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            agregarAmigo();
        }
    });
});

function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        console.log('Por favor, ingresa un nombre válido.');
        return false;
    }

    // Convertir el nombre a minúsculas para evitar duplicados por mayúsculas/minúsculas
    const nombreNormalizado = nombre.trim().toLowerCase();

    // Verificar si el amigo ya existe en la lista
    if (amigos.some(amigo => amigo.toLowerCase() === nombreNormalizado)) {
        console.log(`${nombre} ya está en la lista de amigos.`);
        return false;
    }

    // Agregar el amigo a la lista
    amigos.push(nombre.trim());
    console.log(`${nombre} ha sido agregado a la lista de amigos.`);
    actualizarListaAmigos();
    inputAmigo.value = ''; // Limpiar el input después de agregar
}

function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpiar la lista actual

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

function sortearAmigoSecreto() {
    if (amigos.length < 2) {
        alert('Se necesitan al menos 2 amigos para realizar el sorteo.');
        return;
    }

    const asignaciones = sortearAmigo();
    mostrarResultadoSorteo(asignaciones);
}

function sortearAmigo() {
    let amigosDisponibles = [...amigos];
    let asignaciones = {};

    for (let i = 0; i < amigos.length; i++) {
        let amigoActual = amigos[i];
        let indiceAmigoSecreto;

        do {
            indiceAmigoSecreto = Math.floor(Math.random() * amigosDisponibles.length);
        } while (amigosDisponibles[indiceAmigoSecreto] === amigoActual && amigosDisponibles.length > 1);

        asignaciones[amigoActual] = amigosDisponibles[indiceAmigoSecreto];
        amigosDisponibles.splice(indiceAmigoSecreto, 1);
    }

    return asignaciones;
}

function mostrarResultadoSorteo(asignaciones) {
    const resultadoLista = document.getElementById('resultado');
    resultadoLista.innerHTML = ''; // Limpiar resultados anteriores

    for (let [amigo, amigoSecreto] of Object.entries(asignaciones)) {
        const li = document.createElement('li');
        li.textContent = `${amigo} -> ${amigoSecreto}`;
        resultadoLista.appendChild(li);
    }
}