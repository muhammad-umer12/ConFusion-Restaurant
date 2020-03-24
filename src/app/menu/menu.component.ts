import { Component, OnInit , Inject, Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import { baseURL} from "../shared/baseurl";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})



export class MenuComponent implements OnInit {

  
  errMess: string;
   BaseURL: any;
  constructor(private dishService: DishService,
   ) { }
  dishes: Dish[] ;
      img: any;
  ngOnInit() {
   this.img =  'http://localhost:3000/'
    
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

    
  

  selectedDish: Dish;




}
