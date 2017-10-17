'use strict';

let express = require('express');
let formidable = require('express-formidable');
let app = express();
let server = app.listen(8080);
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let router = express.Router();

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
		res.status(200).json({msg:'Your application has been received! You will contact you within 15 business days.'});
	}
});

router.post('/update', (req, res)=>{
	if(req.files.file === undefined){
		res.status(400).json({msg:'Please include your resume as part of your application'});
	}else if(req.files.file.type!=='application/pdf'){//415
		res.status(415).json({msg:'Invalid file type. Please upload a PDF'});
	}else if(users[req.cookies.userID]===undefined){
		res.status(400).json({msg:'You have not applied to any positions yet. If you would like apply to a position please see our "Positions" page'});
	}else if(false){//TODO sha1 mismatch out
		res.status(400).json({msg:'Sorry, the CV you uploaded does not match your profile'});
	}else if(false){//TODO sha1 is good
		res.status(200).json({msg:'Your profile has been updated! flag{ sha1-Collisions_ARR_C00L }'});
	}else{
		res.status(500).json({msg:'An unknown error occured'});
	}
});
/*END API*/

app.use('/api', router);