const fs = require('fs');

class Ticket {

    constructor(NumTicket, Escritorio) {
        this.numero = NumTicket;
        this.escritorio = Escritorio;
    }

}


class TicketControl {

    constructor() {
        this.ultimoTicket = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //Arreglo con tickets pendientes
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimoTicket = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {

        this.ultimoTicket++;

        let ticket = new Ticket(this.ultimoTicket, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimoTicket}`;

    }

    reiniciarConteo() {

        this.ultimoTicket = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se a iniciado el sistema');

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimoTicket}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //elimina primer elemento del arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento
        }

        console.log('Ultimos4:', this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    grabarArchivo() {

        let JsonData = {
            ultimo: this.ultimoTicket,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let JsonDataString = JSON.stringify(JsonData);

        fs.writeFileSync('./server/data/data.json', JsonDataString);
    }

}






module.exports = {
    TicketControl
}