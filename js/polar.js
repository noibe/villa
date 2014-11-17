/*!
 * Villa Polar v2.0.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
*/

// TIME AJUST
// =========================

function ajustClock() {
    var d = new Date();
    var time= ('0'	+ d.getHours()).slice(-2)+':'+('0' + d.getMinutes()).slice(-2);

    $('.clock-text').html(time);
}

window.onload = function() {
    ajustClock();
}

window.setInterval(function(){
    ajustClock();
}, 1000);
