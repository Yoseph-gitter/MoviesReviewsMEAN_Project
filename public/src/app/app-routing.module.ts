import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { AppComponent } from './app.component';
import { EditReviewComponent } from './edit-review/edit-review.component';

const routes: Routes = [
  {  path : "movies", pathMatch: 'full' , component: MovieListComponent  },

  {  path : "movies/new", pathMatch: 'full' , component: CreateMovieComponent },

  {  path : "movies/:id", pathMatch: 'full' , component: ReviewListComponent },

  {  path : "movies/:id/review", pathMatch: 'full' , component: AddReviewComponent },

  {  path : "movies/review/:id/edit", pathMatch: 'full' , component: EditReviewComponent },

  {  path : '' , pathMatch: 'full' , redirectTo:"/movies" },
  
  { path: "**" ,  component : AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
