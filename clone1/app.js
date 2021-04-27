const express = require('express');
const fileupload = require('express-fileupload');
const fs = require('fs');
const app=express();
app.use(fileupload());
const path=require('path');
app.use(express.static(path.join(__dirname,'public/css')));
const port = process.env.PORT || 1337;
app.get('/', function(req,res){
    res.sendFile(__dirname+"/public/views/index.html");
});
app.get('/script.js',function(req, res){
    res.sendFile(path.join(__dirname, 'public/scripts/script.js'))
});
app.get('/css/style.css',function(req, res){
    res.sendFile(path.join(__dirname, 'public/css/style.css'))
});

app.post('/saveImage', (req, res) => {
    const fileName = req.files.myFile.name;
    const path = __dirname + fileName;
  
    req.files.myFile.mv(path, (error) => {
      if (error) {
        console.error(error)
        res.writeHead(500, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({ status: 'error', message: error }))
        return
      }
  
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
    })
  })

  app.listen(port, () => console.log(`Listening On ${port}`));

function respondNotFound(req,res){
    res.end('F');
}
