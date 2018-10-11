import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from './../movie-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  options = [1, 2, 3, 4, 5];
 
  reviews = {
            "reviewer_name": '',
            "stars": 1 ,
            "review": ''
          };
  id : any;
   //erros object 
 customErrors : object []=[];

  //event handler for the select element's change event
selectChangeHandler (event: any) {
  //update the ui
  this.reviews.stars = event.target.value;
}

  constructor(
    private moveService: MovieServiceService,
    private activatedRoute: ActivatedRoute,
    private __router : Router) { }

  ngOnInit() {
    //this.addReview();
  }

  addReview(){
  
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.id = params['id'] ;
      console.log(this.id) ;
    });
    
    this.moveService.addReview(this.id, this.reviews).toPromise()
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
}
