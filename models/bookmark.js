var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookmarks');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var bookmark_schema = new Schema({
    author    : ObjectId
  , url       : String
  , title     : String
  , description: String
});


exports.new = function(){
  return mongoose.model('Bookmark', bookmark_schema);
};
