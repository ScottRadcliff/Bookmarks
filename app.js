
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose')

var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/bookmarks');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var bookmark_schema = new Schema({
    author    : ObjectId
  , url       : String
  , title     : String
});

var Bookmark = mongoose.model('Bookmark', bookmark_schema)

var bookmarkInstance = new Bookmark({url: "http://google.com", title: "This is an amazing site."});
bookmarkInstance.save(function(err){
  if (err) return console.log("Error");
});




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
  Bookmark.find(function(err, bookmarks){
    if(!err) {
      res.render("index", { title: "Bookmarks", bookmarks_collecton: bookmarks })
    } else {
      return err;
    }
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
