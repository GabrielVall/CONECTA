function obtenerVista(url = 'php/view/inicio.html'){
    fetch(url)
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        // Initialize the DOM parser


        // You can now even select part of that html as you would in the regular DOM 
        // Example:
        // var docArticle = doc.querySelector('article').innerHTML;

        $('.new_screen').html(html);
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
}
function cambiarPantalla(){
    $('.new_screen').addClass('change_screen');
    // $('.screen,.new_screen').toggleClass('screen new_screen');
    // $('.change_screen').removeClass('change_screen');
    // $('.new_screen').addClass('change_screen');
}
function getJson(url){
    return new Promise(resolve => {
        fetch(url, {
            method: "GET",
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json())
        .then(function(json) {
            resolve(json);
        })
        .catch(function(error) {
            resolve(error);
        });
    });
}
function cargarIdioma(idioma,arreglo){
    var textos = arreglo[idioma];
    $('[data-num="1"] .titulo').html(textos.titulo1);
    $('[data-num="1"] .descripcion1').html(textos.descripcion);
    $('[data-num="2"] .titulo').html(textos.titulo2);
    $('[data-num="2"] .descripcion1').html(textos.descripcion2);
    $('[data-num="3"] .titulo').html(textos.titulo3);
    $('[data-num="3"] .descripcion1').html(textos.descripcion3);
}