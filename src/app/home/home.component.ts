import { Component, OnInit } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader'
import {LeaderService} from '../services/leader.service'
 @Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader : Leader
  disherrMess : any;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice : LeaderService) { }

  ngOnInit() {

    this.dishservice.getFeaturedDish()
    .subscribe(dishes => this.dish = dishes,
      errmess => this.disherrMess = <any>errmess);
  
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errmess => this.disherrMess = <any>errmess)
    
    this.leaderservice.getFeaturedLeader().
    subscribe(leader => this.leader = leader,
      errmess => this.disherrMess = <any>errmess)
    
  }


}
