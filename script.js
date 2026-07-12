const palabrasJson = "palabras.json";
const fraseInicio = "fraseInicio.json";

const PLAY =`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262420" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4v16l13 -8l-13 -8" /></svg>`;
const PAUSE =`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262420" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -12" /><path d="M14 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -12" /></svg>`;

const MUTE =`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_183)"> <rect width="24" height="24" fill="white"></rect> <path d="M3 16V8H6L11 4V20L6 16H3Z" stroke="#262420" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.5 15L20.5 9" stroke="#262420" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.5 9L20.5 15" stroke="#262420" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_15_183"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>`;
const SOUND = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_174)"> <rect width="24" height="24" fill="white"></rect> <path d="M3 16V8H6L11 4V20L6 16H3Z" stroke="#262420" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13 9C13 9 15 9.5 15 12C15 14.5 13 15 13 15" stroke="#262420" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 7C15 7 18 7.83333 18 12C18 16.1667 15 17 15 17" stroke="#262420" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 5C17 5 21 6.16667 21 12C21 17.8333 17 19 17 19" stroke="#262420" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_15_174"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>`;

let sonidoActivado = true;

async function obtenerPalabra(){
    const res = await fetch(palabrasJson);
    const data = await res.json();
    
    const categorias = Object.keys(data);
    const categoriaAleatoria = categorias[Math.floor(Math.random()* categorias.length)];
    
    const palabras = Object.keys(data[categoriaAleatoria]);
    const palabraAleatoria = palabras[Math.floor(Math.random()* palabras.length)];

    cambiarPalabra(data[categoriaAleatoria][palabraAleatoria]);
    
    if(sonidoActivado){
        leerPalabra(data[categoriaAleatoria][palabraAleatoria]);
    }
    
}

async function obtenerDosPalabras(){
    const res = await fetch(url);
    const data = await res.json();
    
    const categorias = Object.keys(data);
    
    let categoriaAleatoria = categorias[Math.floor(Math.random()* categorias.length)];
    const palabras = Object.keys(data[categoriaAleatoria]);
    let palabraAleatoria = palabras[Math.floor(Math.random()* palabras.length)];

    let categoriaAleatoria2 = categorias[Math.floor(Math.random()* categorias.length)];
    const palabras2 = Object.keys(data[categoriaAleatoria2]);
    let palabraAleatoria2 = palabras2[Math.floor(Math.random()* palabras2.length)];

    cambiarPalabra(data[categoriaAleatoria][palabraAleatoria]+' '+data[categoriaAleatoria2][palabraAleatoria2]);
    leerPalabra(data[categoriaAleatoria][palabraAleatoria]);
    leerPalabra(data[categoriaAleatoria2][palabraAleatoria2]);
}

const playPauseButton = document.getElementById('playPauseButton');
let reproduciendo = false;

playPauseButton.onclick = function(){
    
    if(!reproduciendo){
        playPauseButton.innerHTML = PAUSE;
        cambiarFraseInicio();
        resetPalabra();
        timer();
    }else{
        playPauseButton.innerHTML = PLAY;
        clearTimeout(timeoutId);
        timeoutId = null; 
    }
    reproduciendo = !reproduciendo;
}

const soundButton = document.getElementById('soundButton');
let sonido = true;

soundButton.onclick = function(){
    if(sonido){
        soundButton.innerHTML = MUTE;
        sonidoActivado = false;
    }else{
        soundButton.innerHTML = SOUND;
        sonidoActivado = true;
    }
    sonido = !sonido;
}

function timer( ){
    const min = 15000;
    const max = 60000;
    let tiempo = Math.floor(Math.random() * (max - min + 1)) + min;
    
    timeoutId = setTimeout(()=>{
        obtenerPalabra();
        timer();
    }, tiempo);
}
const placeholderFraseInicio = document.getElementById('placeholderFraseInicio');
const placeholderPalabra = document.getElementById('placeholderPalabra');

async function cambiarFraseInicio(){
    const res = await fetch(fraseInicio);
    const data = await res.json();

    const frases = Object.keys(data.frase_inicio);
    const fraseDeInicio = frases[Math.floor(Math.random()* frases.length)];
    placeholderFraseInicio.textContent = data.frase_inicio[fraseDeInicio];
}

function cambiarPalabra(palabra){
    placeholderPalabra.textContent = palabra;
}

function resetPalabra(){
    placeholderPalabra.textContent = "";
}

function leerPalabra(palabra){
    const lectura = new SpeechSynthesisUtterance(palabra);
    lectura.lang = "es-AR";
    speechSynthesis.speak(lectura);
}