function cambiarPantalla(){
    $('.screen,.new_screen').toggleClass('screen new_screen');
    $('.change_screen').removeClass('change_screen');
    $('.new_screen').addClass('change_screen');
}
$(function() {
    $('.new_screen').addClass('change_screen');

    $( ".next_btn" ).click(function() {
        var selector = $('.step.active');
        selector.removeClass('active');
        if( selector.next().is('.step') ){
            selector.next().addClass('active');
        }else{
            $('.step').first().addClass('active');
        }
    });

});