/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
var app = module.exports = express.createServer()

var bookmark = require("./models/bookmark");

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  var Bookmark = bookmark.new();
  Bookmark.find().sort({"_id": -1}).exec(function(err, bookmarks){
    if(!err) {
      res.render("index", { bookmarks_collecton: bookmarks })
    } else {
      return err;
    }
  });
});

app.get('/add', function(req, res) {
  res.render("add");
});

app.post('/create', function(req, res){
  var Bookmark = bookmark.new();
  var bookmarkInstance = new Bookmark({url: req.body.link, description: req.body.description});
  bookmarkInstance.save(function(err){
    if (err) return console.log("Error");
    res.redirect("/");
  });
})


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
