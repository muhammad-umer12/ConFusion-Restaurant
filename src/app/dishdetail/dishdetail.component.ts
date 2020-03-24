import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment'  
import { DISHES } from '../shared/dishes';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  
  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
    };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'Rating is required.'
    },
    'comment': {
      'required':      'Email is required.',

    },
  };
  disherrMess: string;
  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
    )
     {
      
     }
     a = 0;

    dishIds: string[];
    prev: string;
    next: string;
   
    comments : Comment;
    commentForm : FormGroup
    dish: Dish;

  
   check:any;

  ngOnInit() {
    this.check=false;
    this.createForm();
    this.dishservice.getDishIds().subscribe(
      dishIds => this.dishIds = dishIds,
      errmess => this.disherrMess = <any>errmess);

    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['idd'])))
    .subscribe((dish) => { this.dish = dish;
      console.log("problem occured")
      console.log(this.dish);
       this.setPrevNext(dish.id); },
       errmess => this.disherrMess = <any>errmess);
    
    
    console.log("dish agai")
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }


  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: [5, ],
      comment: ['', [Validators.required] ],
      date: ['']
      
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

                    }

                    onValueChanged(data?: any) {
                      if (!this.commentForm) { return; }
                      const form = this.commentForm;
                      
                      for (const field in this.formErrors) {
                         
                        if (this.formErrors.hasOwnProperty(field)) {
                          // clear previous error message (if any)
                          this.formErrors[field] = '';
                          const control = form.get(field);
                        
                          if (control && control.dirty && !control.valid) {
                            const messages = this.validationMessages[field];
                  
                            for (const key in control.errors) {
                          
                              if (control.errors.hasOwnProperty(key)) {
                                this.formErrors[field] += messages[key] + ' ';
                              }
                            }
                          }
                        }
                      }
                    }


                    onSubmit() {

                      this.check=true;
                      this.comments = this.commentForm.value;
                      let dt = new Date();
                      
                      this.commentForm.value.date = dt.toISOString() ;
                      console.log(this.commentForm.value);
                      this.dish.comments.push(this.commentForm.value);
                      
                        console.log(this.comments);
                      this.commentForm.reset({
                        author: '',
                        rating: 5,
                        comment: ''
                      });
                      this.feedbackFormDirective.resetForm();
                    }

}
