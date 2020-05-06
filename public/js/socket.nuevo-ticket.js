var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('desconectado al servidor');
});

socket.on('estadoActual', function(ticket) {
    label.text(ticket.actual);
});

$('button').on('click', function() {
    socket.emit('SiguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});