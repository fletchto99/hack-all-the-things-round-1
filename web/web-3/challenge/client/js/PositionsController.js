recruitingApp.controller('PositionsController', function(recruitService){
  var positions = this;

  positions.availablePositions = [];

  recruitService.getPositions().then(function(data){
  	positions.availablePositions = data;
  });
});