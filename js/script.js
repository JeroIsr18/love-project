/* =========================================================
   💖 PROYECTO: LOVE PROJECT
   Archivo: js/script.js
   ========================================================= */


/* =========================================================
   1. CONFIGURACIÓN
   ========================================================= */

const CONFIG = {

    // Cantidad de "I LOVE YOU" que aparecerán
    cantidadLove: 55,

    // Cantidad de frases románticas
    cantidadFrases: 18,

    // Cada cuánto aparece un nuevo elemento
    intervalo: 180,

    // Frases personalizadas
    frases: [
        "mi niña",
        "corazón",
        "pequeña",
        "mi niña ❤️",
        "mi pequeña",
        "corazón mío",
        "mi niña bonita",
        "pequeña ❤️"
    ],

    // Activar/desactivar corazones
    corazones: true,

    // Cantidad máxima de corazones
    maxCorazones: 25

};


/* =========================================================
   2. ELEMENTOS DEL DOM
   ========================================================= */

const startButton =
    document.getElementById("startButton");

const intro =
    document.getElementById("intro");

const loveContainer =
    document.getElementById("love-container");

const finalMessage =
    document.getElementById("final-message");


/* =========================================================
   3. FUNCIONES AUXILIARES
   ========================================================= */

/**
 * Devuelve un número aleatorio entre min y max.
 */
function random(min, max) {

    return Math.random() * (max - min) + min;

}


/**
 * Devuelve un elemento aleatorio de un arreglo.
 */
function elementoAleatorio(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


/* =========================================================
   4. CREAR "I LOVE YOU"
   ========================================================= */

function crearLove() {

    const love =
        document.createElement("div");

    love.classList.add("love");

    love.textContent = "I LOVE YOU";

    /*
        Posición aleatoria.
    */

    love.style.left =
        random(5, 90) + "vw";

    love.style.top =
        random(5, 90) + "vh";


    /*
        Tamaño ligeramente diferente
        para que no todos sean iguales.
    */

    love.style.fontSize =
        random(14, 28) + "px";


    /*
        Retraso aleatorio de la animación.
    */

    love.style.animationDelay =
        random(0, 2) + "s";


    /*
        Duración aleatoria.
    */

    love.style.animationDuration =
        random(2, 4) + "s";


    loveContainer.appendChild(love);

}


/* =========================================================
   5. CREAR FRASES ROMÁNTICAS
   ========================================================= */

function crearFrase() {

    const frase =
        document.createElement("div");

    frase.classList.add("romantic-text");

    frase.textContent =
        elementoAleatorio(CONFIG.frases);


    /*
        Posición aleatoria.
    */

    frase.style.left =
        random(5, 90) + "vw";

    frase.style.top =
        random(5, 90) + "vh";


    /*
        Tamaño aleatorio.
    */

    frase.style.fontSize =
        random(15, 25) + "px";


    /*
        Retraso aleatorio.
    */

    frase.style.animationDelay =
        random(0, 3) + "s";


    /*
        Duración aleatoria.
    */

    frase.style.animationDuration =
        random(2.5, 5) + "s";


    loveContainer.appendChild(frase);

}


/* =========================================================
   6. CREAR CORAZONES
   ========================================================= */

function crearCorazon() {

    if (!CONFIG.corazones) {
        return;
    }


    /*
        Evitamos llenar demasiado
        la pantalla de corazones.
    */

    const corazonesActuales =
        document.querySelectorAll(".floating-heart").length;

    if (corazonesActuales >= CONFIG.maxCorazones) {
        return;
    }


    const heart =
        document.createElement("div");

    heart.classList.add("floating-heart");

    heart.textContent = "❤️";


    /*
        Posición horizontal aleatoria.
    */

    heart.style.left =
        random(0, 100) + "vw";


    /*
        Tamaño aleatorio.
    */

    heart.style.fontSize =
        random(12, 28) + "px";


    /*
        Duración aleatoria.
    */

    heart.style.animationDuration =
        random(5, 10) + "s";


    /*
        Retraso aleatorio.
    */

    heart.style.animationDelay =
        random(0, 2) + "s";


    document.body.appendChild(heart);


    /*
        Eliminamos el corazón después
        de que termine su animación.
    */

    setTimeout(() => {

        heart.remove();

    }, 12000);

}


/* =========================================================
   7. CREAR ESTRELLAS
   ========================================================= */

function crearEstrella() {

    const estrella =
        document.createElement("div");

    estrella.classList.add("star");

    estrella.textContent = "✦";


    estrella.style.left =
        random(0, 100) + "vw";

    estrella.style.top =
        random(0, 100) + "vh";


    estrella.style.fontSize =
        random(8, 20) + "px";


    estrella.style.animationDelay =
        random(0, 3) + "s";


    loveContainer.appendChild(estrella);

}


/* =========================================================
   8. LLENAR LA PANTALLA
   ========================================================= */

function iniciarLove() {

    /*
        Ocultamos la pantalla inicial.
    */

    if (intro) {

        intro.classList.add("hidden");

    }


    /*
        Pequeña pausa antes de comenzar.
    */

    setTimeout(() => {

        generarExperiencia();

    }, 800);

}


/* =========================================================
   9. GENERAR EXPERIENCIA
   ========================================================= */

function generarExperiencia() {

    let contadorLove = 0;

    let contadorFrases = 0;


    /*
        Generamos I LOVE YOU
        progresivamente.
    */

    const intervaloLove =
        setInterval(() => {

            if (
                contadorLove >=
                CONFIG.cantidadLove
            ) {

                clearInterval(intervaloLove);

                return;

            }


            crearLove();

            contadorLove++;

        }, CONFIG.intervalo);


    /*
        Generamos las frases románticas
        un poco más lentamente.
    */

    const intervaloFrases =
        setInterval(() => {

            if (
                contadorFrases >=
                CONFIG.cantidadFrases
            ) {

                clearInterval(intervaloFrases);

                mostrarMensajeFinal();

                return;

            }


            crearFrase();

            contadorFrases++;

        }, CONFIG.intervalo * 2);


    /*
        Estrellas.
    */

    for (let i = 0; i < 20; i++) {

        setTimeout(() => {

            crearEstrella();

        }, i * 250);

    }


    /*
        Corazones flotando continuamente.
    */

    if (CONFIG.corazones) {

        setInterval(() => {

            crearCorazon();

        }, 700);

    }

}


/* =========================================================
   10. MENSAJE FINAL
   ========================================================= */

function mostrarMensajeFinal() {

    if (!finalMessage) {
        return;
    }


    /*
        Esperamos un poco para que
        termine de llenarse la pantalla.
    */

    setTimeout(() => {

        finalMessage.classList.add("show");

    }, 4000);

}


/* =========================================================
   11. EFECTO AL HACER CLICK
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        /*
            Creamos un pequeño corazón
            donde el usuario hizo click.
        */

        const clickHeart =
            document.createElement("div");

        clickHeart.classList.add(
            "click-heart"
        );

        clickHeart.textContent = "❤️";


        clickHeart.style.left =
            event.clientX + "px";

        clickHeart.style.top =
            event.clientY + "px";


        document.body.appendChild(
            clickHeart
        );


        /*
            Lo eliminamos después
            de la animación.
        */

        setTimeout(() => {

            clickHeart.remove();

        }, 1200);

    }
);


/* =========================================================
   12. BOTÓN DE INICIO
   ========================================================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        iniciarLove
    );

}


/* =========================================================
   13. PREVENIR SCROLL
   ========================================================= */

document.body.style.overflow = "hidden";


/* =========================================================
   14. MENSAJE EN CONSOLA
   ========================================================= */

console.log(
    "❤️ Proyecto iniciado..."
);

console.log(
    "Para mi niña, mi corazón y mi pequeña ❤️"
);