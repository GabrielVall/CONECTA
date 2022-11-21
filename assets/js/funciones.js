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
    if( $('.showing2').length > 0 ){ // Si no hay ningun elemento showin
        if( $('.new_screen').is('.showing2') ){ // Si la nueva pantalla quedo atras
            $('.new_screen').removeClass('showing2').addClass('showing');
            $('.screen').html(contenido).removeClass('showing').addClass('showing2');
            
        }else{
            $('.screen').removeClass('showing2').addClass('showing');
            $('.new_screen').html(contenido).removeClass('showing').addClass('showing2');
        }
        setTimeout(function(){
            $('.showing').removeClass('showing');
        },400)
    }else{
        $('.new_screen').html(contenido).addClass('showing2');
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

async function infoSensor(){
    var info = await getJson('php/controllers/datos_sensor.php');
    if(info.status == "success"){
        data = JSON.parse(info.datos);
        var tabla = '';
        $('#temperatura').html(data[0]['temperatura']);
        $('#humedad').html(data[0]['humedad']);
        $('#presion').html(data[0]['presion']);
        for (var i = 0; i < data.length; i++) {
            tabla = tabla + 
            `<tr>
                <td>${data[i]['id_datos']}</td>
                <td>${data[i]['equipo']}</td>
                <td>${data[i]['temperatura']}</td>
                <td>${data[i]['humedad']}</td>
                <td>${data[i]['presion']}</td>
            </tr>`;
        }
    }else{
        tabla = 
            `<tr>
                <td colspan="5" style="text-align:center;">No hay datos registrados</td>
            </tr>`;
    }
    $('#data_body').html(tabla);
}