var express = require('express');
var bodyParser = require('body-parser');
var PORT = 7000;
var MongoClient = require('mongodb').MongoClient;
var app = express();
var multer = require('multer');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Enabling CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});


MongoClient.connect("mongodb://naveen:naveen@ds163940.mlab.com:63940/naveen", function(err, db) {
	if(err) { 
			return console.dir(err); 
			}
			console.log("DataBase Connected")
			
	
var collection = db.collection('naveen');




app.post('/login', function(req, res) 
{	
	var user=req.body.user;
	var pass=req.body.pass;
console.log(user);
console.log(pass);
	collection.find({ "uname": user,"pwd":pass }).toArray(function(err, result) 
	{
		console.log(result);
	if(result)
	{
		response={
				"output":result
				 }
				console.log(response)
				res.json(response)
	}
	else
	{
		error={
				"output":err
			  }
				console.log(error)
				res.json(error);
	}
	})
		
 })	
 
 
 	

app.post('/insert', function(req, res) {
   
       var uname = req.body.uname
        var email = req.body.email
		var pwd =req.body.pwd
       var pno = req.body.pno
		

		
		console.log(uname+""+email+""+pwd+""+pno);
		collection.insert({"uname":uname,"email":email,"pwd":pwd,"pno":pno},function(err,result){
			if(err){
				console.log('failed');
				
			}
			else{
				console.log('Inserted'+ JSON.stringify(result));
				res.send('inserted');
			}
		})
        
    });
	
	app.post('/visit', function(req, res) 
{	
	var abc = req.body.abc;
	


	collection.find({ "District": abc }).toArray(function(err, result) 
	{
		console.log(result);
	if(result)
	{
		response={
				"output":result
				 }
				console.log(response)
				res.json(response)
	}
	else
	{
		error={
				"output":err
			  }
				console.log(error)
				res.json(error);
	}
	})
		
 })	

 
  app.post('/profile', function(req,res)
 {
	 var user=req.body.user;
	 console.log(user);
	 collection.find({"uname":user}).toArray(function(err,result)
		 {
			 console.log(result);
			 if(result)
			 {
				 response={
					 "output":result
				 }
				 console.log(response)
				 res.json(response)
				 }
				 else{
					 error={
						 "output":err
					 }
					 console.log(error)
					 res.json(error);
				 }
				
			 		 })
	 
})
	
	app.post('/sub', function(req, res) {
   var email=req.body.email;
   var avail=req.body.availleaves;
   
   	 collection.updateOne({"email":email},{$set:{"totlev":avail}},function(err,result)
		 {
			 console.log(result);
			 if(result)
			 {
				 response={
					 "output":result
				 }
				 res.json(response)
				 console.log("updated"+JSON.stringify(response))
				 
				 }
				 else{
					 error={
						 "output":err
					 }
					 console.log(error)
					 res.json(error);
				 }
				
			 		 } )
   });
   
   app.post('/userreg',multer({dest:'./public/uploads/'}).single('userreg'),function(req,res) {
	   
	  var place = req.body.place;
        var tourist = req.body.tourist;
		var hotels =req.body.hotels;
       var dis = req.body.dis;
	   var image=req.file.filename;
	 collection.insert({"Place":place,"TouristNo":tourist,"HotelsAvailable":hotels,"District":dis,"placeimg":image},function(err,result)
	 {
			if(result)
			 {
				 response={
					 "output":result
				 }
				 //res.json(response)
				 console.log("updated"+JSON.stringify(response))
				 //res.sendFile()
				 }
				 else{
					 error={
						 "output":err
					 }
					 console.log(error)
					 res.json(error);
				 }
		})
   });	



});	//closing database

app.listen(PORT);
console.log('Server is running on port ' + PORT);
