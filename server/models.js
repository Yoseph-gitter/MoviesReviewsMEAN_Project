const mongoose = require('mongoose');

//connecitng with mangoose 
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/belt_examDB',  { useNewUrlParser: true });

var uniqueValidator = require('mongoose-unique-validator');

const review_skima = new mongoose.Schema({
    reviewer_name :{
        type: String ,
        required: [true,"Movie reviewer Name should not be Empty!"],
        minlength: [3 , "Movie reviewer name should be at least 3 char"],
    },
    stars :{
        type: Number,
        required: [true,"Movie Stars should not be Empty!"],
        min: [1, "Movie Stars  should be between 1-5 char"],
        max: [5, "Movie Stars  should be between 1-5 char"],

    },
    review : {
        type : String,
        required: [true,"Movie review should not be Empty!"],
        minlength: [3 , "Movie review  should be greater than 3 char"],
    }
});


const movie_schema =new mongoose.Schema({
    title : {
        type: String ,
        required: [true,"Title Name should not be Empty!"],
        minlength: [3 , "Title name should be at least 3 char"]
     },
    creater_name : {
        type: String ,
        required: [true,"Movie creater Name should not be Empty!"],
        minlength: [3 , "Movie creater name should be at least 3 char"]
     },

    reviews :[ review_skima ],
    
   }, {timestamps:true});

const Movies = mongoose.model('movies', movie_schema);  

// Pre hook for `findOneAndUpdate`
// movie_schema.pre('findOneAndUpdate', function(next) {
// this.options.runValidators = true;
// next();
// });

movie_schema.plugin(uniqueValidator);

// // Use native promises
mongoose.Promise = global.Promise;

module.exports = Movies  ;