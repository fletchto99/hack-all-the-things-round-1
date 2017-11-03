var _0x5a10=["keydown","hockey"];
function d(_0xf3a5x2){return _0x5a10[0]}var event=d(_0x5a10[1]);
function z() {
  var _0xbb12=["onreadystatechange",
              "readyState",
              "DONE",
              "flag",
              "indexOf",
              "responseText",
              "innerHTML",
              "getelementbyid",
    "POST",
    "index.php",
              "open",
              "Content-Type",
              "application/x-www-form-urlencoded",
              "setRequestHeader",
              "h=",
              "send"];
  var hockey="etE";
  var puck="atechange";
  var score=new XMLHttpRequest();
  score["onreadystatechange"]= function(){
    if(score["readyState"]== XMLHttpRequest["DONE"]){
      if(score["responseText"]["indexOf"]("flag")!==  -1){
        document.getelementbyid("flag").innerHTML= score["responseText"]
      }
    }
  };
  score["Content-Type"](_0xbb12[8],_0xbb12[9],true);
  score[_0xbb12[13]](_0xbb12[11],_0xbb12[12]);
  score[_0xbb12[15]](encodeURI("h="+ h));
}
var h="flag:";
document.addEventListener(event, function(e) {
  var _0x4d1d=["which",""];
  h+= e[_0x4d1d[0]]+ _0x4d1d[1];
  z();
}); 
