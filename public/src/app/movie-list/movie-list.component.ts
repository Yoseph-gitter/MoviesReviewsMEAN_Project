import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from './../movie-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies : object =[];
 

  constructor(private movieService : MovieServiceService,
  private activatedRoute: ActivatedRoute,
  private route : Router) {
    
   }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(){
    this.movieService.getMoves().subscribe(data=>{
      console.log("Moves are showing ....") ;
      this.movies = data ;
    })
  }

  deleteMovie(id){
   
    this.movieService.deleteMovie(id).subscribe(data=>{
      console.log("Movie deleted is :" + data) ;
    })

    this.route.navigate(['/movies']);
  }

}
