const app = require('./server');
const Movies = require('./models');
const bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/movies/new", function(req, res){
    console.log("Posting name :"  + req.body[0]) ;
    var movies =new Movies(req.body);
    
    movies['reviews'][0].reviewer_name =  req.body.creater_name ;

    movies.save(function(errs, data){
        if(errs){
            console.log("Errors" + errs);
            
            res.json({'error' :errs});
        }
        else{
            console.log("Befor Saving Movie ....");
            res.json(data);
        }
    })

});

//get ALL
app.get("/api/movies", function(req, res){
    Movies.find({}  , function(err, data){
        if(data) {
            res.json(data);
        }
        else{
            res.json({'error': err });
        }
    });
})

app.get("/api/movies/:id", function(req, res){
     var object_id = new ObjectId( req.params.id ) ;
     Movies.find({ '_id': {$eq: object_id } } , function(err, data){
         if(data) {
             console.log("Movies " + data[0].reviews);
             res.json(data[0].reviews);
         }
         else{
             res.json({'error':err});
         }
     });
 })
 

app.delete("/api/movies/review/:id/delete", function(req, res){
   Movies.findOne( { 'reviews._id': req.params.id } )
    .then(movie=>{
        let reviews = movie.reviews;
        console.log("Reviews array is :" + reviews);
        
        movie.reviews.splice(movie.reviews.findIndex(v => v._id == req.params.id), 1);
        console.log("Reviews array is :" + reviews);
        return movie.save();
    })
    .then(movie => res.json(movie))
    .catch(errs => res.json(errs));
   
})

app.delete("/api/movies/:id", function(req, res){
    Movies.findOneAndRemove(req.params.id)
    .then(data => res.json(data))
    .catch(errs => res.json(errs))
})

app.get("/api/movies/review/:id", function(req, res){
    var review ;
    Movies.findOne( { 'reviews._id': req.params.id } )
    .then(data => {
        review = data.reviews.id(req.params.id) ;
        res.json( review );
    })
    .catch(errs => res.json({'error':errs}))
  
});

app.patch("/api/movies/:id/review", (req,res)=>{
    Movies.findById(req.params.id)
    .then(movies=>{
        movies.reviews.push(req.body);

        return movies.save();
    })
    .then(data=> res.json(data))
    .catch(errs=> res.json({'error': errs}))
});


app.patch("/api/movies/review/:id", function(req, res){
    Movies.findOne( { 'reviews._id': req.params.id } )
    .then(movie => {
        let index = movie.reviews.findIndex(value => value._id == req.params.id) ;
        movie.reviews[index] = req.body ;
        return movie.save();
    })
    .then(data => res.json(data))
    .catch(errs => res.json({'error':errs}))
  
});

app.listen(8000, function(){
    console.log("Running on 8000 port ...");
}); 