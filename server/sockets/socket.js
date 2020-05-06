const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-contol');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('SiguienteTicket', (data, callback) => {
        let CurrendTicked = ticketControl.siguienteTicket();
        console.log(CurrendTicked);
        callback(CurrendTicked);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesatio'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('estadoActual', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        });

    });

});