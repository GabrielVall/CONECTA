$( async function() {
    $('.new_screen').addClass('change_screen');

    const idioma = 'esp';
    let json = await getJson('assets/json/idioma_config.json');
    cargarIdioma(idioma,json);
    
    $( ".next_btn" ).click(function() {
        var selector = $('.step.active');
        selector.removeClass('active');
        if( selector.next().is('.step') ){
            selector.next().addClass('active');
        }else{
            $('.step').first().addClass('active');
        }
        var num = $('.step.active').data('num');;
        $('.capa').removeClass('visible');
        $('.capa[data-num="'+num+'"]').addClass('visible');
    });

});