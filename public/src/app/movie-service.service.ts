import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private _movieService : HttpClient) { }

  getMoves(){
  return this._movieService.get("/api/movies");
  }

  createMovie(payload){
    return this._movieService.post("/api/movies/new", payload);
  }

  getMovieReviews(movieId){
    console.log("ON the service before request" + movieId)
    return this._movieService.get("/api/movies/"+movieId);
  }
  addReview(movieId, payload){
    return this._movieService.patch("/api/movies/"+movieId+"/review", payload);
  }

  editReview(movieId, payload){
    return this._movieService.patch("/api/movies/review/"+movieId , payload);
  }

  removeReviewFromMovies(movieId){
    return this._movieService.delete("/api/movies/review/"+movieId+"/delete") ;
    
  }

  getMovieReview(reviewId){
    return this._movieService.get("/api/movies/review/"+reviewId ) ;
  }

  deleteMovie(movie_id){
    return this._movieService.delete("/api/movies/"+movie_id) ;
  }
}
