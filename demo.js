var http=require("http");
var url = require("url");
var fs=require("fs");
var query=require("querystring");
var module=require("./modul2");
function process_request(req,resp)
{
	var u=url.parse(req.url);
	resp.writeHead(200,{'Content-Type':'text/html'});
	switch(u.pathname)
	{
		case '/':
		fs.readFile("search.html",function(err,data)
		{
			if(err)
			{
				console.log("file not found");
				resp.writeHead(404,{'Content-Type':'text/html'});
				resp.end("File Not found");
			}
			resp.write(data);
			resp.end();
		});
			break;
		case '/calc':
			var str="";
			req.on('data',function(d)
			{
			str+=d;	
			console.log(str);
			});
			req.on('end',function(){
				console.log(str);
				var ob=query.parse(str);
				var sum=module.add(ob.name,ob.pass);
				resp.end("<h1>Addition : "+sum+"</h1>");
			});
			break;
		case '/login':
		var sr="";
		req.on('data',function(d){
			sr+=d;
		});
		req.on('end',function(){
			var check=query.parse(sr);
			var result=module.checkuser(check.name,check.pass);
				u.pathname="/login";
				resp.end("<h1>User : "+result+"</h1>");				
		});
		break;
	}
}
var server=http.createServer(process_request);
server.listen(8081);
console.log('Rajat Server running at http://127.0.0.1:8081/');
