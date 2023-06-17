function verEjemplo(){
    let dato1 = 5;
    console.log('dato1: ', dato1);
    let dato2 = 8;
    console.log('dato2: ', dato2);
    let suma = dato1+dato2;
    console.log('suma: ', suma);
    let elParrafo = document.getElementById('resultado');
    elParrafo.innerText = suma;
    console.log('Terminó la función verEjemplo()');
}

function presentarMensaje(){
    let elParrafoAsincrono = document.getElementById('resultadoAsincrono');
    elParrafoAsincrono.innerText = 'Este mensaje se mostró después de 6 segundos de haber presionado el botón';
    console.log('Terminó la función de callback presentarMensaje()');
}

function presentarOtroMensaje(){
    let elParrafoAsincrono = document.getElementById('resultadoAsincrono');
    elParrafoAsincrono.innerText = 'Este saludo se muestra al cabo de 12 segundos';
    console.log('Terminó la función de callback presentarOtroMensaje()');
}

function presentarMensajeFinal(){
    let elParrafoAsincrono = document.getElementById('resultadoAsincrono');
    elParrafoAsincrono.innerText = 'Este es el mensaje final después de 27 segundos';
    console.log('Terminó la función de callback presentarMensajeFinal()');
}

function verEjemploAsincrono(){
    setTimeout(presentarMensaje, 6000);// setTimeout es una función asíncrona
    setTimeout(presentarMensajeFinal, 27000);// setTimeout es una función asíncrona
    setTimeout(presentarOtroMensaje, 12000);// setTimeout es una función asíncrona
    console.log('Terminó la función verEjemploAsincrono()');
}

function verPromesas(){
    let miPromesa = new Promise(function(resolve, reject){
        console.log('iniciando creacion de la promesa');
        console.log('consumiendo la base de datos');
        let decision = false;
        // producing code -Codigo que lleva algo de tiempo
        setTimeout( 
            ()=>{
                        if(decision == true){
                            resolve('Se resolvió la promesa');
                        }
                        else{
                            reject('Error: rechazamos la promesa');
                        }
            } 
        ,11000);
        console.log('terminó la creacion de la promesa');
    });
    // consuming code - 
    miPromesa.then(resultado =>{
        console.log('Se invoca .then');
        console.log(resultado);
        let elParrafoPromesas = document.getElementById('parrafoPromesas');
        elParrafoPromesas.style.color='green';
        elParrafoPromesas.style.fontSize='25px';
        elParrafoPromesas.innerText = resultado;
    })
            .catch(error=>{
        console.log('se invoca .catch()');
        console.log(error);
        let elParrafoPromesas = document.getElementById('parrafoPromesas');
        elParrafoPromesas.style.color='red';
        elParrafoPromesas.style.fontSize='20px';
        elParrafoPromesas.innerText = error;
    });

}

function consumirApiMiIndicador(){
    let url= 'https://mindicador.cl/api';
    // let recursoLocal = 'assets/json/informacion.json';
    // el fetch solo funciona con peticiones httpRequest
    // los recursos se solicitan con el protocolo http (red)
    fetch(url)
        // este .then es del fetch, por si se resuelve la promesa de consumir el endpoint del api
        .then(respuesta => respuesta.json())
        // este .then es del método .json() que puede tomar tiempo en transformar el texto entregado por la api en un JSON manipulable por js
        .then(resultados =>{
            console.log(resultados);
            let fechaPropiedad = resultados.dolar.fecha;
            let nombrePropiedad = resultados.dolar.nombre;
            let unidadPropiedad = resultados.dolar.unidad_medida;
            let valorPropiedad = resultados.dolar.valor;

            let mensaje = `La información del ${nombrePropiedad} el ${fechaPropiedad} medido en ${unidadPropiedad} es: ${valorPropiedad}`;
            
            let elParrafoDolar = document.getElementById('parrafoDolar');
            elParrafoDolar.style.color = 'blue';
            elParrafoDolar.style.fontSize = '25px';
            elParrafoDolar.innerText = mensaje;
        })
        .catch(error=>{
            console.log(error);
        });

}


function consumirApiMiIndicadorLocal(){

    let recursoLocal = 'assets/json/informacion.json';
    // el fetch solo funciona con peticiones httpRequest
    // los recursos se solicitan con el protocolo http (red)
    fetch(recursoLocal)
        // este .then es del fetch, por si se resuelve la promesa de consumir el endpoint del api
        .then(respuesta => respuesta.json())
        // este .then es del método .json() que puede tomar tiempo en transformar el texto entregado por la api en un JSON manipulable por js
        .then(resultados =>{
            console.log(resultados);
            let fechaPropiedad = resultados.dolar.fecha;
            let nombrePropiedad = resultados.dolar.nombre;
            let unidadPropiedad = resultados.dolar.unidad_medida;
            let valorPropiedad = resultados.dolar.valor;

            let mensaje = `La información del ${nombrePropiedad} el ${fechaPropiedad} medido en ${unidadPropiedad} es: ${valorPropiedad}`;
            
            let elParrafoDolarLocal = document.getElementById('parrafoDolarLocal');
            elParrafoDolarLocal.style.color = 'blue';
            elParrafoDolarLocal.style.fontSize = '25px';
            elParrafoDolarLocal.innerText = mensaje;
        })
        .catch(error=>{
            console.log(error);
        });

}

function asignarEventos(){
    let elBoton = document.getElementById('btnPresioname');
    elBoton.addEventListener('click', verEjemplo);

    let elBotonAsincrono = document.getElementById('btnPresionameAsincrono');
    elBotonAsincrono.addEventListener('click', verEjemploAsincrono);

    let elBotonPromesas = document.getElementById('btnPromesas');
    elBotonPromesas.addEventListener('click', verPromesas);

    let elBotonApi = document.getElementById('btnConsumoApi');
    elBotonApi.addEventListener('click', consumirApiMiIndicador );

    let elBotonApiLocal = document.getElementById('btnConsumoApiLocal');
    elBotonApiLocal.addEventListener('click', consumirApiMiIndicadorLocal );
}