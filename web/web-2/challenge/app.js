'use strict';

let express = require('express');
let app = express();
let server = app.listen(8080);
let bodyParser = require('body-parser');
let router = express.Router();
let qs = require('querystring');

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());

router.use((req, res, next)=>{
	next();
});

router.get('/bg', (req, res)=>{
	let output = "";
	//flag{b1Nary_nInJ4s}
	let flag = "01100110011011000110000101100111011110110110001000110001010011100110000101110010011110010101111101101110010010010110111001001010001101000111001101111101";

	let height = req.query.h||0;
	let width = req.query.w||0;
	let screenArea = height * width;
	let digitArea = 10*22;
	let numberOfDigits = screenArea/digitArea;

	if(screenArea<33440){
		res.json(["I doubt your screen is that small"]);
		return;
	}

	let halfwaypoint = Math.floor((numberOfDigits/2)-flag.length);
	for(let i=0;i<halfwaypoint;i++){
    	output+=String(i%2);
	}
	output+=flag;
	for(let i=0;i<halfwaypoint;i++){
    	output+=String(i%2);
	}
	output = output.split('');
	for(let i=output.length-1;i>=0;i--){
		output[i]='<div class="binary">'+output[i]+'</div>';
	}
	res.json(output);
});

router.post('/login', (req, res)=>{
    let data = "";

    req.on("data", function(chunk) {
        data += chunk;
    });

    req.on("end", function() {
        data = qs.parse(data);

        console.log(data);
        if(data.email==="admin" && data.password==="admin"){
            res.json("that is far too easy 😈 <br>keep looking");
        }else{
            res.json("wrong");
        }
    });
});

app.use('/api', router);
