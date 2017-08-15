var express = require('express');
var path = require('path')
var app = express();
var opn = require('opn');
var http = require('http');
var _serverdir = path.join(__dirname, '..', 'dist');
var _port = 4000;
app.use('/assets', express.static(_serverdir+'/assets'));

app.use(function(req, res){
	res.sendFile(_serverdir+'/index.html');
});
var server = http.createServer(app);
server.listen(_port);
server.on('listening', function(){
	console.log('端口在：'+_port);
	opn('http://localhost:'+_port);
});