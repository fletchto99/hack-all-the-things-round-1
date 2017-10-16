'use strict';

const crypto = require('crypto');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const server = app.listen(8080);
const router = express.Router();

const secret = `abc123`;

app.use(express.static(`${__dirname}/client`));

router.get('/download', (req, res) => {
	//flag: 94eb179a29fd000eba77fa7ad6f0184f56d54460495db8a1d4225bbd4684a714d41fc133317c893fa9f3cb3bdf73a098edc178b5e7cb35feb340f3dea5cf990c
	const file = unescape(req.query.file.toString('utf-8'));
	const hash = crypto.createHash('sha512').update(`${secret}${file}`).digest('hex');
	const filepath = path.normalize(`${__dirname}/files/${file}`);

	console.log(file);
	console.log(hash);

	if (!fs.existsSync(filepath)) {
		res.status(404).send({
			error: 'File not found!'
		});
	} else if (hash != req.query.check) {
		res.status(500).send({
			error: 'Integrity check failed!'
		});
	} else {
		res.download(filepath);
	}

});

app.use('/api', router);
