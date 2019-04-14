var mongoclient = require('mongodb').MongoClient;
var url = require('url');
var fs = require('fs');
var querystring=require('querystring');
var dburl = 'mongodb://root:root911@ds125273.mlab.com:25273/devdb';

// mongoclient.connect(dburl, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     console.log("Database created!");
//     db.close();
//   });
var dbo ;
exports.insertRecord = function(url,request, response){
                        
                    mongoclient.connect(dburl, function(err, db) {
                        if (err) throw err;
                        dbo = db.db("devdb");
                        
                    //   ===========START CODE FROM HERE ======================
                     data1= '';
                    request.on('data', function(chunk) {data1 += chunk;   });  
                    request.on('end', function() {
                        qs=querystring.parse(data1);                   
                        username=qs['name'];
                        useraddress=qs['address'];
                        dbo.collection("users").insertOne({name:username,address:useraddress}, function(err, res) {
                            if (err) throw err;
                            response.writeHead(200, {'Content-Type': 'text/html'});
                            response.write("<H1>1 record inserted successfully</H1>");
                            response.end();
                            console.log("1 document inserted");
                            db.close(); }); });    }); }
                           


exports.fetchRecord = function(url, request, response){
    mongoclient.connect(dburl, function(err, db) {
        if (err) throw err;
        dbo = db.db("devdb");
      
    //   ===========START CODE FROM HERE ======================
    data1= '';
    request.on('data', function(chunk) {data1 += chunk; console.log(data1);  });
    
    request.on('end', function() {
        qs=querystring.parse(data1);
        username=qs['name'];
        useraddress=qs['address'];
        console.log(username,"::",useraddress)
        dbo.collection("users").find({$or:[{name:username},{address:useraddress}] }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            if(result.length == 0){
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write("<H1>No results found for the provided parameters!!</H1>");
            }
            else{
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write("<H1>Search Results <br><hr></H1>");
            response.write("<b>Name   ||   Address</b><br><hr>");
            for(var i=0;i<result.length;i++ ){
                response.write(result[i].name+"   ||   "+result[i].address+"<br><hr>");
            }
            response.end();
            db.close();} });
        }); });

}
exports.deleteRecord = function(url, request, response){
    mongoclient.connect(dburl, function(err, db) {
        if (err) throw err;
        dbo = db.db("devdb");
    
    //   ===========START CODE FROM HERE ======================
    data1= '';
    request.on('data', function(chunk) {data1 += chunk;   });
    request.on('end', function() {
        qs=querystring.parse(data1);                        
        username=qs['name'];
        useraddress=qs['address'];
        dbo.collection("users").deleteMany({name:username}, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            response.writeHead(200, {'Content-Type': 'text/html'} );
            response.write("<h1>"+obj.result.n+" Entries deleted!</h1>");
            response.end();
            db.close();
        });

    });
    
    
    });

}

exports.redir_home=function(url,request,response){
    fs.readFile('./home.html', function (err, html) {

        if (err) {

            throw err;

        }      

          response.writeHeader(200, {"Content-Type": "text/html"}); 

            response.write(html); 

            response.end(); 

    });
}