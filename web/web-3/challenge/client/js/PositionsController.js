recruitingApp.controller('PositionsController', function(recruitService){
  var positions = this;

  positions.availablePositions = [];

  recruitService.getPositions().then(function(data){
  	console.log(data)
  	positions.availablePositions = data;
  });
});