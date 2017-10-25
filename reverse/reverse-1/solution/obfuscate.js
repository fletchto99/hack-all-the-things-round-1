const fs = require('fs')
const JScrewIt = require("jscrewit");

let genBitArray = (num, bits) => {
	let n = num.toString(2);
	return n.length >= bits ? n.split('').map(val => parseInt(val)) : (new Array(bits - n.length + 1).join("0") + n).split('').map(val => parseInt(val));
}

let data = ""
let mapping = "flag{wh4T_1S_jsFuck}".split('').forEach(chr => {
    genBitArray(chr.charCodeAt(0), 7).forEach(val => {
    	data += val == 0 ? " " : "	";
    })
});

fs.writeFileSync('./challenge', JScrewIt.encode(`console.log('getting there!! Keep going!!');console.log('running... (about 5 seconds)');/* Try to find the flag, it should be hiding in here somewhere according to our reliable source! *//${data}/.source.replace(/.{7}/g,function(w){/* flag += */String.fromCharCode(parseInt(w.replace(/ /g,'0').replace(/	/g,'1'),2))});setTimeout(()=>{console.log('eval done... result: fail')},3000);`, {
	runAs: 'call'
}));
