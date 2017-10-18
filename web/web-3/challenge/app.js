'use strict';

let express = require('express');
let formidable = require('express-formidable');
let app = express();
let server = app.listen(8080);
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let router = express.Router();
let crypto = require('crypto');
let fs = require('fs');

app.use(express.static(__dirname + '/client'));

// app.use(bodyParser.json());
app.use(cookieParser());

router.use((req, res, next)=>{
	next();
});

app.use(formidable({
	// encoding: 'utf-8',
	uploadDir: __dirname + '/uploads',
	keepExtensions: true,
	maxFieldsSize: 2*1024*1024, //2MB
	maxFields: 1
}));


let datePosted = new Date();
datePosted.setDate(datePosted.getDate() - 7);
let position = {
	id: 1,
	title: "IT Security_179833BR",
	jobID: "R11774",
	datePosted: datePosted,
	location: "New York, New York",
	description: "Why Work at E Corp?\nEndless challenges and rewards. Opportunities on six continents. A team of colleagues fueled by collaboration. All this, and a company deeply committed to integrity and responsibility."
}

let users = {};

const sha1 = path => new Promise((resolve, reject) => {
	const hash = crypto.createHash('sha1')
	const rs = fs.createReadStream(path)
	rs.on('error', reject)
	rs.on('data', chunk => hash.update(chunk))
	rs.on('end', () => resolve(hash.digest('hex')))
});

const sha512 = path => new Promise((resolve, reject) => {
	const hash = crypto.createHash('sha512')
	const rs = fs.createReadStream(path)
	rs.on('error', reject)
	rs.on('data', chunk => hash.update(chunk))
	rs.on('end', () => resolve(hash.digest('hex')))
});


/*API*/
router.get('/positions', (req, res)=>{
	res.json([
		position
	]);
});

router.get('/position', (req, res)=>{
	console.log(req.query.id);
	if(req.query.id==="1"){
		res.json(position);
	}else{
		res.sendStatus(404);
	}
});

router.post('/apply', (req, res)=>{
	//TODO: verify that only one file can be uploaded
	// console.log(req.files); // contains files
	if(req.files.file === undefined){
		res.status(400).json({msg:'Please include your resume as part of your application'});
	}else if(req.files.file.type!=='application/pdf'){//415
		res.status(415).json({msg:'Invalid file type. Please upload a PDF'});
	}else if(users[req.cookies.userID]!==undefined){
		res.status(400).json({msg:'You have already applied to this position. If you would like update your resume please see our "Update Your Profile" page'})
	}else{
		// console.log(req.files.file.path);
		users[req.cookies.userID] = {file0:req.files.file.path};
		res.status(200).json({msg:'Your application has been received! You will contact you within 15 business days. Should you need to update your resume you can do it at any point via the "Update" page'});
	}
});

router.post('/update', (req, res)=>{
	if(req.files.file === undefined){
		res.status(400).json({msg:'Please include your resume as part of your application'});
		return;
	}else if(req.files.file.type!=='application/pdf'){//415
		res.status(415).json({msg:'Invalid file type. Please upload a PDF'});
		return;
	}else if(users[req.cookies.userID]===undefined){
		res.status(400).json({msg:'You have not applied to any positions yet. If you would like apply to a position please see our "Positions" page'});
		return;
	}

	// find hashes
	let hashValue0='', hashValue1='';
	users[req.cookies.userID].file1 = req.files.file.path;

	let hash0Promise = sha1(users[req.cookies.userID].file0).then(hash=>{
		return hash;
	}).catch(err=>{
		throw new Error(err);
	});

	let hash1Promise = sha1(users[req.cookies.userID].file1).then(hash=>{
		return hash;
	}).catch(err=>{
		throw new Error(err);
	});


	let hash0ValidatePromise = sha512(users[req.cookies.userID].file0).then(hash=>{
		return hash;
	}).catch(err=>{
		throw new Error(err);
	});

	let hash1ValidatePromise = sha512(users[req.cookies.userID].file1).then(hash=>{
		return hash;
	}).catch(err=>{
		throw new Error(err);
	});

	Promise.all([hash0Promise, hash1Promise, hash0ValidatePromise, hash1ValidatePromise]).then(hashes=>{
		console.log(hashes);
		if(hashes[0]!==hashes[1]){
			res.status(400).json({msg:'Integrity mismatch! No matching resume found?'});
			return;
		}else if(hashes[0]===hashes[1]){
			if (hashes[2] === hashes[3]) {
				res.status(400).json({msg:'You\'ve already uploaded that resume! No changes detected?'});
			} else {
				res.status(200).json({msg:'Your profile has been updated! flag{sha1-Collisions_ARR_C00L}'});
			}
			return;
		}
		res.status(500).json({msg:'An unknown error occured'});
	});

});
/*END API*/

app.use('/api', router);
