import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from './../movie-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Options } from '../../../node_modules/@types/selenium-webdriver/safari';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
 options = [1, 2, 3, 4, 5];
 default = this.options[0] ;

//event handler for the select element's change event
selectChangeHandler (event: any) {
  //update the ui
 // this.movie['reviews'][0]['stars'] = event.target.value;
}

  
  movie : object =  {
    
    "title": '',
    "creater_name": '',

    "reviews": [
        {
            "reviewer_name": '',
            "stars": 1 ,
            "review": ''
        }
    ]
};
 //erros object 
 customErrors : object []=[];

   constructor(private movieService : MovieServiceService,
    private _router: Router) { }

  ngOnInit() {
  }

  addMovie(){

    console.log(this.movie);
    this.movieService.createMovie(this.movie).toPromise()
        .then(data=>{
          if(data['error']){
            this.customErrors[0] = data['error']['errors'] ;
            console.log("Errors on server : " + this.customErrors) ;
          }else{
        
            //navigate to 
          this._router.navigate(['/movies']);
          }
          
        }).catch(errs=>{
          console.log("Error while adding movies and error is : " + errs) ;
          this.customErrors[0] = errs['error']['errors'] ;
        });
  }
}
