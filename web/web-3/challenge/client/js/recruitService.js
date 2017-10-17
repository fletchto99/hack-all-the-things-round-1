recruitingApp.service('recruitService', function recruitService($http, $cookies){

  var userID;
  if($cookies.get('userID')===undefined){
    userID = Math.random().toString(36).slice(2);
    $cookies.put('userID', userID);
  }else{
    userID = $cookies.get('userID');
  }

	var recruitService = {
      getUserID: function(){
        return userID;
      },
    	getPositions: function(){
    		return $http.get('/api/positions').then(function(result){
      			return result.data;
      		});
    	},
    	getPosition: function(id){
    		return $http.get('/api/position',{params:{id,id}}).then(function(result){
      			return result.data;
      		});
    	},
    	sendApplication: function(data){
        data.userID = userID;
        return $http({
          url: "/api/apply",
          method: "POST",
          data: data,
          headers: {'Content-Type': undefined}
        }).then(function(result){
          return result.data;
        });
      },
      updateApplication: function(data){
        data.userID = userID;
        return $http({
          url: "/api/update",
          method: "POST",
          data: data,
          headers: {'Content-Type': undefined}
        }).then(function(result){
          return result.data;
        });
      }
    }

    return recruitService;
});