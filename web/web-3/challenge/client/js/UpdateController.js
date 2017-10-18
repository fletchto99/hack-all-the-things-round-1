recruitingApp.controller('UpdateController', function(recruitService){
  var update = this;
  update.successMessage = "flag{ Not-the-real-flag }";//but it will be here when you solve the challenge :)
  update.hasSuccess = false;
  update.hasError = false;

  update.submit = function(){
  	update.hasSuccess = false;
  	update.hasError = false;
    var formData = new FormData();
    formData.append('file', document.getElementById('resume').files[0]);
    recruitService.updateApplication(formData).then(function(res){
      update.successMessage = res.msg;
      update.hasSuccess = true;
    }, function(err){
      update.errorMessage = err.data.msg;
      update.hasError = true;
    });
  };
});