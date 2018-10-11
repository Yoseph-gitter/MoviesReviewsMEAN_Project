import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../movie-service.service' ;
import { ActivatedRoute, Router, Params } from '@angular/router' ;

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  id : any ;

  options = [1, 2, 3, 4, 5];

  reviews : object = {
    "_id" : '',
    "reviewer_name": 'Yoseph',
    "stars": 0 ,
    "review": 'Default review'
  };

     //erros object 
 customErrors : object []=[];

  constructor(
    private moveService: MovieServiceService,
    private activatedRoute: ActivatedRoute,
    private __router : Router) { }

  ngOnInit() {
    this.getReview();
  }

  getReview(){
    this.activatedRoute.params.subscribe((params : Params)=>{
      this.id = params['id'] ;
    } );
    //console.log("Id is is:" + this.id) ;
    this.moveService.getMovieReview(this.id).subscribe(data =>{
      //console.log("data is:" + data) ;
      this.reviews = data ;
      
    }) ;
  }

  editReview(review_id){
      console.log("Review Id is : " + review_id) ;
      this.moveService.editReview( review_id, this.reviews).toPromise()
    .then(data=>{
        if(data['error']){
          this.customErrors[0] = data['error']['errors'] ;
        }else{
        this.__router.navigate(['/movies']);
        }
    })
    .catch(errs=>{
        this.customErrors[0] = errs['error']['errors'] ;
    });
  }

  updateStarsOnchange(value : String){
    console.log("Event value : " + value) ;
    this.reviews["stars"] = value ;
  }


}
