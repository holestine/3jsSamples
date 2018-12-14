var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('scripts'));
app.use(express.static('textures'))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.htm'));
});

app.get('/1.htm', function (req, res) {
  res.sendFile(path.join(__dirname + '/1.htm'));
});
app.get('/2.htm', function (req, res) {
  res.sendFile(path.join(__dirname + '/2.htm'));
});
app.get('/3.htm', function (req, res) {
  res.sendFile(path.join(__dirname + '/3.htm'));
});
app.get('/4.htm', function (req, res) {
  res.sendFile(path.join(__dirname + '/4.htm'));
});
app.get('/5.htm', function (req, res) {
  res.sendFile(path.join(__dirname + '/5.htm'));
});
app.get('/lorenz.htm', function (req, res) {
  res.sendFile(path.join(__dirname + '/Lorenz.htm'));
});

app.get('/app1.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/app1.js'));
});
app.get('/app2.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/app2.js'));
});
app.get('/app3.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/app3.js'));
});
app.get('/app4.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/app4.js'));
});
app.get('/app5.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/app5.js'));
});
app.get('/lorenz.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/lorenz.js'));
});

app.get('/scripts/three.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/scripts/three.js'));
});

app.use(express.static('textures'))
app.use(express.static('/'))

app.listen(8080);