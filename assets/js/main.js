function cambiarPantalla(){
    $('.screen,.new_screen').toggleClass('screen new_screen');
    $('.change_screen').removeClass('change_screen');
    $('.new_screen').addClass('change_screen');
}
$(function() {
    $('.new_screen').addClass('change_screen');
});