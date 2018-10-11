import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from './../movie-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews : object =[];
  id : any;
  review_id : any;

   //erros object 
 customErrors : object []=[];
 options = [1, 2, 3, 4, 5];

 constructor(private movieService : MovieServiceService,
  private activatedRoute: ActivatedRoute,
  private router : Router) {
    
   }
  

  ngOnInit() {
    this.getReviews();
  }

  getReviews(){
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.id = params['id'] ;
      console.log(this.id) ;
    });
    console.log(this.id);
    this.movieService.getMovieReviews(this.id).subscribe(data=>{
      this.reviews = data ;
      console.log("Movie lists are " + this.reviews);
    });
  }

  editReview(review_id){
      this.router.navigate(['movies/review/', review_id ,'edit']);

  } 
  removeReview(review_id){
      this.movieService.removeReviewFromMovies(review_id).subscribe(data=>{
        this.reviews = data ;
        console.log("Movie deleted are " + data );
      });
     
      this.router.navigate(['/movies']) ;
  }
}
