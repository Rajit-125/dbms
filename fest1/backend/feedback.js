const mongoose=require('mongoose')

var Schema =  mongoose.Schema
var Feedback =new Schema({
    participantUsn: {type:String},
    feedbackText: {type:String},
    rating: {type:Number},
  });
  
  module.exports = mongoose.model('Feedback', Feedback);
  

