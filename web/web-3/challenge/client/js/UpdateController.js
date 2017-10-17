recruitingApp.controller('UpdateController', function(recruitService){
  var update = this;

  update.submit = function(){
    var formData = new FormData();
    formData.append('file', document.getElementById('resume').files[0]);
    recruitService.sendApplication(formData);
  };
});