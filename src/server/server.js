import http from 'http';
import express from 'express';

export default class Server {
	static PORT = process.env.PORT == undefined ? 8000 : process.env.PORT;

	constructor(express) {
		this.express = express;
		this.httpServer = http.createServer(this.express);
		this.routes();
		this.httpServer.listen(Server.PORT, () => {
			console.log(`Server running at http://localhost:${Server.PORT}/`);
		});
	}

	routes() {
		// Routes statiques
		this.express.use('/public', express.static('public'));
        // Home
        this.express.use('/home', express.static('index.html'));

        this.express.get('/', (req, res) => {
            res.redirect('/home');
        });

	}
}