recruitingApp.controller('PositionController', function(recruitService, $stateParams){
  var recruit = this;

  recruit.hasError = false;
  recruit.hasApplyError = false;
  recruit.hasApplySuccess = false;
  recruit.positionId = $stateParams.positionId;
  recruit.errorMessage = '';
  recruit.successMessage = '';

  recruitService.getPosition(recruit.positionId).then(function(data){
    recruit.position = data;
  }, function(err){
  	recruit.errorMessage = 'An issue was encountered while trying to retreive the requested job posting';
  	recruit.hasError = true;
  	console.log(err)
  });

  recruit.submit = function(){
  	recruit.hasApplyError = false;
  	recruit.hasApplySuccess = false;
    var formData = new FormData();
    formData.append('file', document.getElementById('resume').files[0]);
    recruitService.sendApplication(formData).then(function(res){
    	recruit.successMessage = res.msg;
    	recruit.hasApplySuccess = true;
    	console.log(res);
    }, function(err){
    	recruit.errorMessage = err.data.msg;
    	recruit.hasApplyError = true;
    	console.log(err);
    });
  };
});