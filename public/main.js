var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(function($routeProvider) {
    
    $routeProvider
       
		.when('/login', {
			url:'/login',
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
		
		.when('/signup', {
			url:'/signup',
            templateUrl: 'signup.html',
            controller: 'signupCtrl'
        })
		
		.when('/visit', {
			url:'/visit',
            templateUrl: 'visit.html',
            controller: 'visitCtrl'
        })
		
		.when('/home', {
			url:'/home',
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
		
		.when('/admin', {
			url:'/admin',
            templateUrl: 'admin.html',
            controller: 'adminCtrl'
        })
		
		
        .otherwise({
            redirectTo: '/login'
        });
});
mainApp.controller('loginCtrl', function($scope, $http, $window,$location) {
	$scope.sign=function(){
	$location.path('/signup')
	}
   $scope.login=function()
  {
	  	  var response={
		  "user":$scope.user,
		  "pass":$scope.pass
		  }
	  
    $http.post('http://localhost:7000/login',response).then(function(response)
	  {
		$window.alert(JSON.stringify(response))
		
		  if(response.data.output.length!=0)
          {
			    if(response.data.output[0].email=="mbonthu2@miraclesoft.com")
			  {
      			alert('valid credentials');
				$location.path('/admin');
           
		   console.log(JSON.stringify(response.data.output[0]))
           $window.localStorage.setItem('uprofile',JSON.stringify(response.data.output[0]))
	  
	 	  }	
                   else{
					   console.log("userdata" +JSON.stringify(response.data.output))
           $window.localStorage.setItem('uprofile',JSON.stringify(response.data.output[0]))
		    $location.path('/home')
					   }
		 }          
		  else{
			  alert("Login Failed")
			}
	  })
  }
});


mainApp.controller('signupCtrl', function($scope, $http, $window,$location) {
   $scope.signin = function() {
	
	var details={
		
		"uname":$scope.uname,
   		"email":$scope.email,
		"pwd":$scope.pwd,
		"pno":$scope.pno
		
	}
	alert(JSON.stringify(details));

        $http.post("http://localhost:7000/insert",details).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Data Inserted Successfully!!');
				$location.path('/login')
            } else {
                $window.alert('Sorry insertion failed. Check your mail !!');

            }
        })

    }
	
});

mainApp.controller('homeCtrl', function($scope, $http, $window) {
	
		  
	$scope.getPlaces=function(){
		
		
		var data={
			
			"abc":$scope.dname
		}
		
		        $http.post("http://localhost:7000/visit",data).then(function(response) {
            if (response.data.output.length != 0) {
				alert(response.data.output);
                $scope.res2 = response.data.output;
				
				
            } else {
                $window.alert('Sorry insertion failed. Check your mail !!');

            }
        })
		

	}
	
						 $scope.profile=function()
  {
	  var ddata = JSON.parse($window.localStorage.getItem('uprofile'))
	  alert(JSON.stringify(ddata))
	  var user = ddata.uname
       alert(JSON.stringify(user))
	  	  	 var pro = {
				 "user":user
			 }
	  alert(JSON.stringify(pro))
	 $http.post('http://localhost:7000/profile',pro).then(function(res)
	 {
		 if(res.data.output.length!=0)
		 {
			 $scope.prof=res.data.output;
			 
				
		 }
		 else
		 {
			 alert("failed");
		 }
	 })
  }
  
  $scope.IsVisible = false;
$scope.dets=function(){
	 $scope.IsVisible = $scope.IsVisible ? false : true;
	  
	  
}
  

 
});

mainApp.controller('adminCtrl', function($scope, $http, $window,$location) {
  $scope.getPlaces=function(){
		
		
		var data={
			
			"abc":$scope.dname
		}
		
		        $http.post("http://localhost:7000/visit",data).then(function(response) {
            if (response.data.output.length != 0) {
				alert(response.data.output);
                $scope.res2 = response.data.output;
				
				
            } else {
                $window.alert('Sorry insertion failed. Check your mail !!');

            }
        })
		

	}
	
	  
  $scope.IVisible = false;
$scope.addPlaces=function(){
	 $scope.IVisible = $scope.IVisible ? false : true;
	  
	  
}
	
	
});



