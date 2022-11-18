const _MENSAJE_ERROR = 'Error interno, porfavor intente más tarde';
function obtenerVista(url){ // Función para obtener una vista mediante una petición
    url = 'php/views/' + url + '.html'; // Asignamos la carpeta donde almacenamos la vista
    return new Promise(resolve => { // Creamos una promesa para pausar el codigo hasta a que la funcion termine de ejecutarse
        fetch(url).then(function(contenido) { // Traemos el contenido de la petición
            resolve(contenido.text()); // Retornamos el texto de la petición
        }).catch(function(error) {   // Si hay un error
            console.log('No se pudo cargar el contenido: ', error);  //Imprimimos el contenido de la respuesta en la consola
            resolve(_MENSAJE_ERROR); // Mensaje generico de error
        });
    });
}
async function cambiarPantalla(vista){
    var contenido = await obtenerVista(vista); //Traemos la vista inicial
    if( !$('.screen').is('.showing') ){ // Si screen ya esta mostrada tomaremos el otro div 
        $('.screen').html(contenido).addClass('showing');
        setTimeout(function(){
            $('.new_screen').removeClass('showing2');
        },400);
    }else{
        $('.new_screen').html(contenido).addClass('showing2');
        setTimeout(function(){
            $('.screen').removeClass('showing');
        },400);
    }
}
function getJson(url,tipo = 'GET', content = 'application/json;charset=UTF-8'){ // Obtener un JSON mediante una petición
    return new Promise(resolve => { // Creamos una promesa para pausar el codigo hasta a que la funcion termine de ejecutarse
        fetch(url, { // Iniciamos la petición con la url recibida
            method: tipo, // Tipo de la petición
            headers: {"Content-type": content} // Header de la petición
        }).then(response => response.json()).then(function(json) { // Esperamos al JSON
            resolve(json); // Retornamos el JSON
        })
        .catch(function(error) { // En caso de error
            console.log('No se pudo cargar el contenido: ', error);  //Imprimimos el contenido de la respuesta en la consola
            resolve(_MENSAJE_ERROR); // Mensaje generico de error
        });
    });
}
function cargarIdioma(idioma,arreglo){ // Función para mostrar textos en el idioma seleccionado
    var textos = arreglo[idioma]; // Seleccionamos el objeto del arreglo con la variable idioma

    //Aplicamos los textos a los divs seleccionados
    $('[data-num="1"] .titulo').html(textos.titulo1);
    $('[data-num="1"] .desc').html(textos.descripcion1);
    $('[data-num="2"] .titulo').html(textos.titulo2);
    $('[data-num="2"] .desc').html(textos.descripcion2);
    $('[data-num="3"] .titulo').html(textos.titulo3);
    $('[data-num="3"] .desc').html(textos.descripcion3);
}