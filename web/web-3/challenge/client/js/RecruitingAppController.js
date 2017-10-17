recruitingApp.controller('RecruitingAppController', function(recruitService) {
  var recruit = this;

  recruit.resume;

  recruit.datePosted = new Date();
  recruit.datePosted.setDate(recruit.datePosted.getDate() - 7);

  recruit.submit = function(){
    var formData = new FormData();
    formData.append('file', document.getElementById('resume').files[0]);
    recruitService.sendApplication(formData);
  };

});