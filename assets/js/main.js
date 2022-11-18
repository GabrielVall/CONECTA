$( async function() {   // Al cargar la página
    
    cambiarPantalla('inicio'); //Cambiamos a la vista al cargar

    const idioma = 'esp'; //Idioma por defecto
    let json = await getJson('assets/json/idioma_config.json'); //Obtenemos el json de idiomas
    cargarIdioma(idioma,json); // Cargamos la configuración de idioma
    
    $(document).on('click', '.next_btn',function(){ // Al clickear el boton de tutorial
        var selector = $('.step.active'); // Declaramos el boton activo (circulos abajo de la desc)
        if( selector.next().is('.step') ){ // Si hay mas circulos a la derecha
            selector.removeClass('active'); // Le qutitamos la clase activa
            selector.next().addClass('active'); // Añadimos la clase activa
            var num = $('.step.active').data('num'); // Seleccionamos el numero del paso actual con el atributo data-num
            $('.capa').removeClass('visible'); // Ocultamos todas las capas
            $('.capa[data-num="'+num+'"]').addClass('visible'); // Mostramos la capa con el mismo numero del paso
        }else{ 
            cambiarPantalla('crear_cuenta'); // Cargamos una nueva vista
        }
    });
});